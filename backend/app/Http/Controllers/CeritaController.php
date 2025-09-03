<?php

namespace App\Http\Controllers;

use App\Models\Cerita;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;

class CeritaController extends Controller
{
    public function index(Request $request)
    {
        $q = Cerita::query()
            ->with(['provinsi:id,name', 'user:id,name'])
            ->when($request->filled('search'), function ($qq) use ($request) {
                $s = trim($request->query('search'));
                $qq->where(function ($w) use ($s) {
                    $w->where('judul', 'like', "%{$s}%")
                        ->orWhere('summary', 'like', "%{$s}%");
                });
            })
            ->when($request->filled('provinsi_id'), fn($qq) => $qq->where('provinsi_id', $request->query('provinsi_id')))
            ->orderByDesc('published_at')
            ->orderByDesc('id');

        // Non-admin atau tidak minta include_unpublished => hanya yang published
        $user = $request->user();
        $includeUnpublished = $request->boolean('include_unpublished');
        if (!$user || $user->role !== 'admin' || !$includeUnpublished) {
            $q->where('is_published', true);
        } else {
            // admin boleh override dengan is_published explicit jika ingin
            if ($request->filled('is_published')) {
                $q->where('is_published', (bool) $request->query('is_published'));
            }
        }

        $perPage = (int) $request->query('per_page', 15);
        return response()->json($q->paginate($perPage));
    }

    /**
     * GET /cerita/{ceritum}
     */
    public function show(Cerita $ceritum)
    {
        if (!$ceritum->is_published) {
            $this->authorizeAdmin(auth()->user()); // unpublished hanya admin
        }

        $ceritum->load(['provinsi:id,name,lat,lng', 'user:id,name']);
        return response()->json($ceritum);
    }

    /**
     * GET /cerita/slug/{slug}
     */
    public function showBySlug(string $slug)
    {
        $ceritum = Cerita::where('slug', $slug)->firstOrFail();

        if (!$ceritum->is_published) {
            $this->authorizeAdmin(auth()->user());
        }

        $ceritum->load(['provinsi:id,name,lat,lng', 'user:id,name']);
        return response()->json($ceritum);
    }

    /**
     * POST /cerita  (admin only)
     */
    public function store(Request $request)
    {
        $this->authorizeAdmin($request->user());

        $data = $request->validate([
            'provinsi_id'  => ['required', 'exists:provinsi,id'],
            'judul'        => ['required', 'string', 'max:200'],
            'slug'         => ['nullable', 'string', 'max:220', 'unique:cerita,slug'],
            'summary'      => ['nullable', 'string'],
            'cerita'       => ['required', 'string'],
            'is_published' => ['nullable', 'boolean'],
            'published_at' => ['nullable', 'date'],
        ]);

        $data['user_id'] = $request->user()->id;

        if (empty($data['slug'])) {
            $data['slug'] = $this->makeUniqueSlug($data['judul']);
        }

        // Normalisasi publish fields
        $isPublished = (bool) ($data['is_published'] ?? false);
        $publishedAt = $data['published_at'] ?? null;

        if ($isPublished) {
            $data['is_published'] = true;
            $data['published_at'] = $publishedAt ? Carbon::parse($publishedAt) : now();
        } else {
            $data['is_published'] = false;
            $data['published_at'] = null;
        }

        $cerita = Cerita::create($data);

        return response()->json($cerita->load(['provinsi:id,name', 'user:id,name']), 201);
    }

    /**
     * PUT/PATCH /cerita/{ceritum}  (admin only)
     */
    public function update(Request $request, Cerita $ceritum)
    {
        $this->authorizeAdmin($request->user());

        $data = $request->validate([
            'provinsi_id'  => ['sometimes', 'required', 'exists:provinsi,id'],
            'judul'        => ['sometimes', 'required', 'string', 'max:200'],
            'slug'         => ['nullable', 'string', 'max:220', Rule::unique('cerita', 'slug')->ignore($ceritum->id)],
            'summary'      => ['nullable', 'string'],
            'cerita'       => ['sometimes', 'required', 'string'],
            'is_published' => ['nullable', 'boolean'],
            'published_at' => ['nullable', 'date'],
        ]);

        // Auto-generate slug bila judul diubah dan slug kosong
        if (array_key_exists('judul', $data) && empty($data['slug'])) {
            $data['slug'] = $this->makeUniqueSlug($data['judul'], $ceritum->id);
        }

        // Normalisasi publish fields bila ada salah satu field terkait
        if (
            array_key_exists('is_published', $data) ||
            array_key_exists('published_at', $data)
        ) {
            $isPublished = (bool) ($data['is_published'] ?? $ceritum->is_published);
            $publishedAt = $data['published_at'] ?? $ceritum->published_at;

            if ($isPublished) {
                $data['is_published'] = true;
                $data['published_at'] = $publishedAt ? Carbon::parse($publishedAt) : ($ceritum->published_at ?? now());
            } else {
                $data['is_published'] = false;
                $data['published_at'] = null;
            }
        }

        $ceritum->update($data);

        return response()->json($ceritum->load(['provinsi:id,name', 'user:id,name']));
    }

    /**
     * DELETE /cerita/{ceritum}  (admin only)
     */
    public function destroy(Request $request, Cerita $ceritum)
    {
        $this->authorizeAdmin($request->user());
        $ceritum->delete();

        return response()->json(['message' => 'Cerita deleted successfully.']);
    }

    /**
     * POST /cerita/{ceritum}/publish  (admin only)
     * (opsional: endpoint khusus publish cepat)
     */
    public function publish(Request $request, Cerita $ceritum)
    {
        $this->authorizeAdmin($request->user());

        $ceritum->is_published = true;
        $ceritum->published_at = $ceritum->published_at ?? now();
        $ceritum->save();

        return response()->json($ceritum->load(['provinsi:id,name', 'user:id,name']));
    }

    // ================== Helpers ==================

    private function makeUniqueSlug(string $judul, ?int $ignoreId = null): string
    {
        $base = Str::slug($judul);
        $slug = $base;
        $i = 1;

        while (
            Cerita::where('slug', $slug)
            ->when($ignoreId, fn($q) => $q->where('id', '!=', $ignoreId))
            ->exists()
        ) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }

    private function authorizeAdmin($user): void
    {
        if (!$user) {
            abort(401, 'Unauthorized.');
        }
        if ($user->role !== 'admin') {
            abort(403, 'Forbidden.');
        }
    }
}
