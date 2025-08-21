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
        // $q = Provinsi::query();

        // if ($s = $request->query('search')) {
        //     $q->where(function ($w) use ($s) {
        //         $w->where('name', 'like', "%{$s}%")
        //             ->orWhere('code', 'like', "%{$s}%");
        //     });
        // }

        // $q->orderBy('name');

        // $perPage = (int) $request->query('per_page', 15);
        // return response()->json($q->paginate($perPage));

        $provinsi = Provinsi::all();
        return response()->json($provinsi);
    }

    public function store(StoreProvinsiRequest $request)
    {
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

    public function destroy($id)
    {
        $provinsi = Provinsi::findOrFail($id);
        if (!$provinsi) {
            return response()->json(['message' => 'Provinsi not found'], 404);
        }
        $provinsi->delete();
        return response()->json([
            'message' => 'Provinsi deleted successfully.'
        ], 200);
    }
}
