<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ActivationEmail extends Controller
{
    public function activate($token)
    {
        $user = User::where('activation_token', $token)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Token tidak valid'
            ], 400);
        }

        $user->update([
            'is_active' => 1,
            'activation_token' => null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Akun berhasil diaktivasi'
        ]);
    }
}
