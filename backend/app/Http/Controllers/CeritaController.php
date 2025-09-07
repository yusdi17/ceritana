<?php

namespace App\Http\Controllers;

use App\Models\Cerita;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

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
                      ->orWhere('cerita', 'like', "%{$s}%");
                });
            })
            ->when(
                $request->filled('provinsi_id'),
                fn($qq) => $qq->where('provinsi_id', $request->query('provinsi_id'))
            )
            ->orderByDesc('published_at')
            ->orderByDesc('id');

        $user = $request->user();
        $includeUnpublished = $request->boolean('include_unpublished');

        if (!$user || $user->role !== 'admin' || !$includeUnpublished) {
            $q->where('is_published', true);
        } else {
            if ($request->filled('is_published')) {
                $q->where('is_published', filter_var($request->query('is_published'), FILTER_VALIDATE_BOOLEAN));
            }
        }

        $perPage = (int) $request->query('per_page', 15);
        return response()->json($q->paginate($perPage));
    }

    public function show(Cerita $cerita)
    {
        if (!$cerita->is_published) {
            $this->authorizeAdmin(auth()->user());
        }

        $cerita->load(['provinsi:id,name', 'user:id,name']);
        return response()->json($cerita);
    }

    public function showBySlug(string $slug)
    {
        $cerita = Cerita::where('slug', $slug)->firstOrFail();

        if (!$cerita->is_published) {
            $this->authorizeAdmin(auth()->user());
        }

        $cerita->load(['provinsi:id,name', 'user:id,name']);
        return response()->json($cerita);
    }

    public function store(Request $request)
    {
        $this->authorizeAdmin($request->user());

        $data = $request->validate([
            'provinsi_id'  => ['required', 'exists:provinsi,id'],
            'judul'        => ['required', 'string', 'max:200', 'unique:cerita,judul'],
            'slug'         => ['nullable', 'string', 'max:220', 'unique:cerita,slug'],
            'cerita'       => ['required', 'string'],
            'thumbnail'    => ['nullable', 'image'],
            'is_published' => ['nullable', 'boolean'],
            'published_at' => ['nullable', 'date'],
        ]);

        $data['user_id'] = $request->user()->id;

        if (empty($data['slug'])) {
            $data['slug'] = $this->makeUniqueSlug($data['judul']);
        }
        $isPublished = (bool) ($data['is_published'] ?? false);
        $publishedAt = $data['published_at'] ?? null;

        if ($isPublished) {
            $data['is_published'] = true;
            $data['published_at'] = $publishedAt ? Carbon::parse($publishedAt) : now();
        } else {
            $data['is_published'] = false;
            $data['published_at'] = null;
        }

         $cerita = DB::transaction(function () use ($request, $data) {
        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $data['thumbnail'] = $path;
        }

        return Cerita::create($data);
    });


        return response()->json(
            $cerita->load(['provinsi:id,name', 'user:id,name']),
            201
        );
    }

    public function update(Request $request, Cerita $cerita)
    {
        $this->authorizeAdmin($request->user());

        $data = $request->validate([
            'provinsi_id'  => ['sometimes', 'required', 'exists:provinsi,id'],
            'judul'        => [
                'sometimes', 'required', 'string', 'max:200',
                Rule::unique('cerita', 'judul')->ignore($cerita->id),
            ],
            'slug'         => [
                'nullable', 'string', 'max:220',
                Rule::unique('cerita', 'slug')->ignore($cerita->id),
            ],
            'cerita'       => ['sometimes', 'required', 'string'],
            'is_published' => ['nullable', 'boolean'],
            'published_at' => ['nullable', 'date'],
        ]);
        if (array_key_exists('judul', $data) && empty($data['slug'])) {
            $data['slug'] = $this->makeUniqueSlug($data['judul'], $cerita->id);
        }
        if (array_key_exists('is_published', $data) || array_key_exists('published_at', $data)) {
            $isPublished = (bool) ($data['is_published'] ?? $cerita->is_published);
            $publishedAt = $data['published_at'] ?? $cerita->published_at;

            if ($isPublished) {
                $data['is_published'] = true;
                $data['published_at'] = $publishedAt ? Carbon::parse($publishedAt) : ($cerita->published_at ?? now());
            } else {
                $data['is_published'] = false;
                $data['published_at'] = null;
            }
        }

        $cerita->update($data);

        return response()->json($cerita->load(['provinsi:id,name', 'user:id,name']));
    }
    public function destroy(Request $request, Cerita $cerita)
    {
        $this->authorizeAdmin($request->user());
        $cerita->delete();

        return response()->json(['message' => 'Cerita deleted successfully.']);
    }
    public function publish(Request $request, Cerita $cerita)
    {
        $this->authorizeAdmin($request->user());

        $cerita->is_published = true;
        $cerita->published_at = $cerita->published_at ?? now();
        $cerita->save();

        return response()->json($cerita->load(['provinsi:id,name', 'user:id,name']));
    }

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
        if (!$user) abort(401, 'Unauthorized.');
        if ($user->role !== 'admin') abort(403, 'Forbidden.');
    }
}
