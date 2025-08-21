<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PermintaanKontributor;

class PermintaanKontributorController extends Controller
{
    // User buat permintaan
    public function store(Request $request)
    {
        $user = $request->user();

        // Cek apakah user sudah pernah ajukan
        if ($user->permintaanKontributor) {
            return response()->json(['message' => 'Anda sudah pernah mengajukan permintaan.'], 422);
        }

        $data = $request->validate([
            'alasan' => ['nullable', 'string'],
        ]);

        $permintaan = PermintaanKontributor::create([
            'user_id' => $user->id,
            'alasan' => $data['alasan'] ?? null,
            'status' => 'pending',
        ]);

        return response()->json($permintaan, 201);
    }

    // Admin lihat semua permintaan
    public function index()
    {
        $this->authorizeAdmin();

        $list = PermintaanKontributor::with('user:id,name,email')
            ->orderByDesc('created_at')
            ->get();

        return response()->json($list);
    }

    // Admin setujui
    public function approve(PermintaanKontributor $permintaan)
    {
        $this->authorizeAdmin();

        $permintaan->update([
            'status' => 'disetujui',
            'notes' => 'Disetujui sebagai kontributor',
        ]);

        // bisa update role user jadi 'kontributor'
        $permintaan->user->update(['role' => 'kontributor']);

        return response()->json($permintaan);
    }

    // Admin tolak
    public function reject(Request $request, PermintaanKontributor $permintaan)
    {
        $this->authorizeAdmin();

        $data = $request->validate([
            'notes' => ['nullable', 'string'],
        ]);

        $permintaan->update([
            'status' => 'ditolak',
            'notes' => $data['notes'] ?? 'Permintaan ditolak',
        ]);

        return response()->json($permintaan);
    }

    private function authorizeAdmin()
    {
        $user = auth()->user();
        if (!$user || ($user->role ?? null) !== 'admin') {
            abort(403, 'Hanya admin yang bisa mengakses.');
        }
    }
}
