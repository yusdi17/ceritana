<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use GuzzleHttp\Psr7\Response;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
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

        $user = User::all();
        return response()->json($user);
    }

    public function destroy(Request $request, $id)
    {
        $auth = $request->user();
        if (!$auth) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        if ($auth->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        if ($auth->id === $user->id) {
            return response()->json(['message' => 'Tidak dapat menghapus diri sendiri boss!'], 422);
        }

        try {
            DB::transaction(function () use ($user) {
                if (method_exists($user, 'tokens')) {
                    $user->tokens()->delete();
                }
                if (method_exists($user, 'socialAccounts')) {
                    $user->socialAccounts()->delete();
                }
                if (method_exists($user, 'cerita')) {
                    $user->cerita()->delete();
                }
                $user->delete();
            });

            return response()->json(['message' => 'User deleted successfully']);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Internal Server Error',
                'error'   => app()->hasDebugModeEnabled() ? $e->getMessage() : null,
            ], 500);
        }
    }
}
