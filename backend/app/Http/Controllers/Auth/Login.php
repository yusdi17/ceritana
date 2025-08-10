<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;

class Login extends Controller
{
    public function login(Request $request)
    {
        $validate = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Email atau Password Salah'
            ], 401);
        }
        if ($user->is_active !== 1) {
            return response()->json(['status' => 'error', 'message' => 'Akun belum diaktivasi!'], 401);
        }
        $token = $user->createToken('login user ' . $user->name)->plainTextToken;
        return response()->json([
            'token' => $token,
            'user' => new UserResource($user)
        ]);
    }
}
