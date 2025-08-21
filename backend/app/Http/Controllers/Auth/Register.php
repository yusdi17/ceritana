<?php

namespace App\Http\Controllers\Auth;

use Exception;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\ActivationEmail;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class Register extends Controller
{
    Public function Register(Request $request){
        $validate = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $activationToken = Str::random(60);
        try {
            $user = User::create([
                'name' => $validate['name'],
                'email' => $validate['email'],
                'password' => Hash::make($validate['password']),
                'is_active' => false,
                'activation_token' => $activationToken,
                'role' => 'user',
            ]);

            Mail::to($user->email)->send(new ActivationEmail($user, $activationToken));
            return response()->json(['success' => "Register Berhasil"], 201);

        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Registration failed => ' . $e->getMessage(),
            ], 500);
        }
    }
}
