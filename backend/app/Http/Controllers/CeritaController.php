<?php

namespace App\Http\Controllers;

use App\Models\Cerita;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CeritaController extends Controller
{
    public function index(Request $request)
    {
        $q = Cerita::query()
            ->with(['provinsi:id,name,code','user:id,name'])
            ->filter($request->only('search','provinsi_id','status','is_published'))
            ->orderByDesc('published_at')
            ->orderByDesc('id');

        if (!$request->user() || !$request->boolean('include_unpublished')) {
            $q->public();
        }

        $perPage = (int) $request->query('per_page', 15);
        return response()->json($q->paginate($perPage));

        // $cerita = Cerita::all();
        // return response()->json($cerita);
    }

     public function show(Cerita $ceritum)
    {
        if (!$ceritum->is_published || $ceritum->status !== 'approved') {
            $this->authorizeView($ceritum);
        }
        $ceritum->load(['provinsi:id,name,code,lat,lng','user:id,name']);
        return response()->json($ceritum);
    }

    public function showBySlug(string $slug)
    {
        $ceritum = Cerita::where('slug', $slug)->firstOrFail();
        if (!$ceritum->is_published || $ceritum->status !== 'approved') {
            $this->authorizeView($ceritum);
        }
        $ceritum->load(['provinsi:id,name,code,lat,lng','user:id,name']);
        return response()->json($ceritum);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'provinsi_id' => ['required','exists:provinsi,id'],
            'judul'       => ['required','string','max:200'],
            'slug'        => ['nullable','string','max:220','unique:cerita,slug'],
            'summary'     => ['nullable','string'],
            'cerita'      => ['required','string'],
            'status'      => ['nullable', Rule::in(['draft','pending','approved','rejected'])],
            'is_published'=> ['nullable','boolean'],
            'published_at'=> ['nullable','date'],
        ]);

        $data['user_id'] = $user->id;
        $data['status'] = $data['status'] ?? 'pending';

        if (empty($data['slug'])) {
            $data['slug'] = $this->makeUniqueSlug($data['judul']);
        }

        [$data['is_published'], $data['status'], $data['published_at']] =
            $this->normalizePublishFields(
                $data['is_published'] ?? false,
                $data['status'],
                $data['published_at'] ?? null
            );

        $cerita = Cerita::create($data);
        return response()->json($cerita, 201);
    }

    public function update(Request $request, Cerita $ceritum)
    {
        $this->authorizeOwnerOrAdmin($request->user(), $ceritum);

        $data = $request->validate([
            'provinsi_id' => ['sometimes','required','exists:provinsi,id'],
            'judul'       => ['sometimes','required','string','max:200'],
            'slug'        => [
                'nullable','string','max:220',
                Rule::unique('cerita','slug')->ignore($ceritum->id)
            ],
            'summary'     => ['nullable','string'],
            'cerita'      => ['sometimes','required','string'],
            'status'      => ['nullable', Rule::in(['draft','pending','approved','rejected'])],
            'is_published'=> ['nullable','boolean'],
            'published_at'=> ['nullable','date'],
        ]);

        if (isset($data['judul']) && empty($data['slug'])) {
            $data['slug'] = $this->makeUniqueSlug($data['judul'], $ceritum->id);
        }

        if (array_key_exists('is_published', $data) || array_key_exists('status', $data) || array_key_exists('published_at', $data)) {
            [$data['is_published'], $data['status'], $data['published_at']] =
                $this->normalizePublishFields(
                    $data['is_published'] ?? $ceritum->is_published,
                    $data['status'] ?? $ceritum->status,
                    $data['published_at'] ?? $ceritum->published_at
                );
        }

        $ceritum->update($data);
        return response()->json($ceritum);
    }

    public function destroy(Request $request, Cerita $ceritum)
    {
        $this->authorizeOwnerOrAdmin($request->user(), $ceritum);
        $ceritum->delete();
        return response()->json([
            'message' => 'Cerita deleted successfully.'
        ]);
    }

    public function approve(Request $request, Cerita $ceritum)
    {
        $this->authorizeAdmin($request->user());
        $ceritum->status = 'approved';
        if ($ceritum->is_published && !$ceritum->published_at) {
            $ceritum->published_at = now();
        }
        $ceritum->save();

        return response()->json($ceritum);
    }

    public function reject(Request $request, Cerita $ceritum)
    {
        $this->authorizeAdmin($request->user());
        $ceritum->status = 'rejected';
        $ceritum->is_published = false;
        $ceritum->save();

        return response()->json($ceritum);
    }

    public function publish(Request $request, Cerita $ceritum)
    {
        $this->authorizeOwnerOrAdmin($request->user(), $ceritum);

        if ($ceritum->status !== 'approved') {
            return response()->json(['message' => 'Cerita belum di-approve.'], 422);
        }

        $ceritum->is_published = true;
        $ceritum->published_at = $ceritum->published_at ?? now();
        $ceritum->save();

        return response()->json($ceritum);
    }


    private function makeUniqueSlug(string $judul, ?int $ignoreId = null): string
    {
        $base = Str::slug($judul);
        $slug = $base;
        $i = 1;
        while (Cerita::where('slug',$slug)
            ->when($ignoreId, fn($q) => $q->where('id','!=',$ignoreId))
            ->exists()) {
            $slug = "{$base}-{$i}";
            $i++;
        }
        return $slug;
    }

    private function normalizePublishFields($isPublished, $status, $publishedAt)
    {
        if ($isPublished && $status === 'approved') {
            $publishedAt = $publishedAt ? Carbon::parse($publishedAt) : now();
            return [true, 'approved', $publishedAt];
        }
        if ($isPublished && $status !== 'approved') {
            return [false, 'pending', null];
        }
        return [false, $status ?? 'pending', null];
    }

    private function authorizeOwnerOrAdmin($user, Cerita $cerita)
    {
        if (!$user) abort(401, 'Unauthorized.');
        if ($user->role !== 'admin' && $cerita->user_id !== $user->id) {
            abort(403, 'Forbidden.');
        }
    }

    private function authorizeAdmin($user)
    {
        if (!$user) abort(401, 'Unauthorized.');
        if ($user->role !== 'admin') abort(403, 'Forbidden.');
    }

    private function authorizeView(Cerita $cerita)
    {
        $u = auth()->user();
        if (!$u) abort(403, 'Forbidden.');
        if ($u->role !== 'admin' && $u->id !== $cerita->user_id) {
            abort(403, 'Forbidden.');
        }
    }
}
