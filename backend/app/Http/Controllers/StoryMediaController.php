<?php

namespace App\Http\Controllers;

use App\Models\Cerita;
use App\Models\StoryMedia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class StoryMediaController extends Controller
{
    public function index(Cerita $cerita)
    {
        return response()->json(
            $cerita->media()->select('id','type','url','caption','duration_seconds','sort_order','created_at')->get()
        );
    }

    public function store(Request $request, Cerita $cerita)
    {
        $this->authorizeOwnerOrAdmin($request->user(), $cerita);

        $data = $request->validate([
            'type' => ['required', Rule::in(['image','audio','video'])],
            'caption' => ['nullable','string','max:255'],
            'duration_seconds' => ['nullable','integer','min:0'],
            'sort_order' => ['nullable','integer','min:0'],

            'file' => ['nullable','file', 'max:20480'], 
            'url'  => ['nullable','string','max:2048'],
        ]);

        if (empty($data['file']) && empty($data['url'])) {
            return response()->json(['message' => 'Harus mengirim file atau url.'], 422);
        }
        if (!empty($data['file']) && !empty($data['url'])) {
            return response()->json(['message' => 'Pilih salah satu: file atau url.'], 422);
        }

        // Validasi mimetype berdasarkan type
        if (!empty($data['file'])) {
            $file = $data['file'];
            $ok = match ($data['type']) {
                'image' => str_starts_with($file->getMimeType(),'image/'),
                'audio' => str_starts_with($file->getMimeType(),'audio/'),
                'video' => str_starts_with($file->getMimeType(),'video/'),
            };
            if (!$ok) return response()->json(['message'=>'Tipe file tidak cocok dengan type.'], 422);

            $path = $file->store("cerita/{$cerita->id}/{$data['type']}", 'public');
            $url  = Storage::disk('public')->url($path);
        } else {
            $url = $data['url'];
        }

        $media = StoryMedia::create([
            'cerita_id' => $cerita->id,
            'type' => $data['type'],
            'url'  => $url,
            'caption' => $data['caption'] ?? null,
            'duration_seconds' => $data['duration_seconds'] ?? null,
            'sort_order' => $data['sort_order'] ?? $cerita->media()->max('sort_order') + 1,
        ]);

        return response()->json($media, 201);
    }

    public function update(Request $request, Cerita $cerita, StoryMedia $media)
    {
        $this->authorizeOwnerOrAdmin($request->user(), $cerita);
        if ($media->cerita_id !== $cerita->id) abort(404);

        $data = $request->validate([
            'caption' => ['nullable','string','max:255'],
            'duration_seconds' => ['nullable','integer','min:0'],
            'sort_order' => ['nullable','integer','min:0'],
            'url' => ['nullable','string','max:2048'],
        ]);

        $media->update($data);
        return response()->json($media);
    }

    public function destroy(Request $request, Cerita $cerita, StoryMedia $media)
    {
        $this->authorizeOwnerOrAdmin($request->user(), $cerita);
        if ($media->cerita_id !== $cerita->id) abort(404);

        // hapus file dari storage ygy
        // if (str_starts_with($media->url, Storage::disk('public')->url(''))) {
        //     $path = str_replace(Storage::disk('public')->url(''), '', $media->url);
        //     Storage::disk('public')->delete($path);
        // }

        $media->delete();
        return response()->json(null, 204);
    }

    public function reorder(Request $request, Cerita $cerita)
    {
        $this->authorizeOwnerOrAdmin($request->user(), $cerita);

        $items = $request->validate([
            '*.id' => ['required','integer','exists:story_media,id'],
            '*.sort_order' => ['required','integer','min:0'],
        ]);

        $ids = collect($items)->pluck('id');
        $count = StoryMedia::where('cerita_id',$cerita->id)->whereIn('id',$ids)->count();
        if ($count !== count($items)) return response()->json(['message'=>'Ada media bukan milik cerita ini.'], 422);

        foreach ($items as $it) {
            StoryMedia::where('id',$it['id'])->update(['sort_order'=>$it['sort_order']]);
        }

        return response()->json(['message'=>'Reorder berhasil.']);
    }

    private function authorizeOwnerOrAdmin($user, Cerita $cerita)
    {
        if (!$user) abort(401, 'Unauthorized.');
        if (($user->role ?? null) !== 'admin' && $cerita->user_id !== $user->id) {
            abort(403, 'Forbidden.');
        }
    }
}
