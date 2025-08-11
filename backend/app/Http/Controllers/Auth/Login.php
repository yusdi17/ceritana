<?php

namespace App\Http\Controllers\Auth;

use Throwable;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\SocialAccount;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

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

    public function SocialAccount(Request $request)
    {
        $request->validate([
            'access_token' => ['required', 'string'],
        ]);

        try {
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->userFromToken($request->access_token);

        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Token Google tidak valid atau kadaluarsa',
                'error'   => $e->getMessage(),
            ], 422);
        }

        $provider      = 'google';
        $providerId    = $googleUser->getId();
        $providerEmail = $googleUser->getEmail();
        $name          = $googleUser->getName();
        $avatar        = $googleUser->getAvatar();
        $accessToken   = $googleUser->token ?? $request->access_token;
        $refreshToken  = $googleUser->refreshToken ?? null;

        $social = SocialAccount::where('provider', $provider)
                    ->where('provider_user_id', $providerId)
                    ->first();

        if ($social) {
            $user = $social->user;

            $social->update([
                'token'          => $accessToken,
                'refresh_token'  => $refreshToken,
                'provider_email' => $providerEmail,
            ]);

            if ($user && $name && $user->name !== $name) {
                $user->name = $name;
                $user->save();
            }

            $apiToken = $user->createToken('api'. $user->name)->plainTextToken;

            return response()->json([
                'message' => 'Login berhasil',
                'token'   => $apiToken,
                'token_type' => 'Bearer',
                'user'    => [
                    'id'     => $user->id,
                    'name'   => $user->name,
                    'email'  => $user->email,
                    'avatar' => $avatar,
                ],
            ]);
        }

        $result = DB::transaction(function () use ($provider, $providerId, $providerEmail, $name, $avatar, $accessToken, $refreshToken) {

            $user = null;
            if ($providerEmail) {
                $user = User::where('email', $providerEmail)->first();
            }

            if (! $user) {
                $user = User::create([
                    'name'  => $name ?: 'Google User',
                    'email' => $providerEmail ?: ('user+'.Str::uuid().'@no-email.local'),
                    'password' => bcrypt(Str::random(40)),
                    'email_verified_at' => now(),
                    'is_active' => true,
                ]);
            }

            SocialAccount::create([
                'user_id'          => $user->id,
                'provider'         => $provider,
                'provider_user_id' => $providerId,
                'provider_email'   => $providerEmail,
                'token'            => $accessToken,
                'refresh_token'    => $refreshToken,
            ]);

            // Token API
            $apiToken = $user->createToken('api')->plainTextToken;

            return [$user, $apiToken];
        });

        [$user, $apiToken] = $result;

        return response()->json([
            'message' => 'Login berhasil (akun dibuat/dihubungkan)',
            'token'   => $apiToken,
            'token_type' => 'Bearer',
            'user'    => [
                'id'     => $user->id,
                'name'   => $user->name,
                'email'  => $user->email,
                'avatar' => $avatar,
            ],
        ], 201);
    }
}
