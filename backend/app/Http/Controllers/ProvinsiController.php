<?php

namespace App\Http\Controllers;

use App\Models\Provinsi;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreProvinsiRequest;

class ProvinsiController extends Controller
{
    public function index(Request $request)
    {
        $authUser = $request->user();
        if (!$authUser) {
            return response()->json(['message' => 'Unauthorized.'], 401);
        }
        if ($authUser->role !== "admin") {
            return response()->json(['message' => 'Anda bukan admin.'], 403);
        }

        $provinsi = Provinsi::all();
        return response()->json($provinsi);
    }

    public function store(StoreProvinsiRequest $request)
    {
        $authUser = $request->user();
        if (!$authUser) {
            return response()->json(['message' => 'Unauthorized.'], 401);
        }
        if ($authUser->role !== "admin") {
            return response()->json(['message' => 'Anda bukan admin.'], 403);
        }
        $provinsi = Provinsi::create($request->validated());
        return response()->json($provinsi, 201);
    }

    public function show(Provinsi $provinsi, $id)
    {
        $provinsi = Provinsi::findOrFail($id);
        if (!$provinsi) {
            return response()->json(['message' => 'Provinsi not found'], 404);
        }
        return response()->json($provinsi);
    }

    public function update(Request $request, Provinsi $provinsi, $id) 
    {
        $provinsi = Provinsi::findOrFail($id);
        if (!$provinsi) {
            return response()->json(['message' => 'Provinsi not found'], 404);
        }
        $validate = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'code' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('provinsi', 'code')->ignore($provinsi->id)
            ],
            'lat'  => ['nullable', 'numeric', 'between:-90,90'],
            'lng'  => ['nullable', 'numeric', 'between:-180,180'],
        ]);
        try {
            $provinsi->update([
                'name' => $request->name,
                'code' => $request->code,
                'lat'  => $request->lat,
                'lng'  => $request->lng,
            ]);
            return response()->json([
                'message' => 'Provinsi updated successfully.',
                'data' => $provinsi
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Update failed: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(Request $request, $id)
    { 
         $authUser = $request->user();
        if (!$authUser) {
            return response()->json(['message' => 'Unauthorized.'], 401);
        }
        if ($authUser->role !== "admin") {
            return response()->json(['message' => 'Anda bukan admin.'], 403);
        }  
        $provinsi = Provinsi::findOrFail($id);
        if (!$provinsi) {
            return response()->json(['message' => 'Provinsi not found'], 404);
        }
        $provinsi->delete();
        return response()->json([
            'message' => 'Pulau Berhasil dihapus'
        ], 200);
    }
}
