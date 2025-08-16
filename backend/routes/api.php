<?php

use Illuminate\Http\Request;
use App\Models\SocialAccount;
use App\Http\Controllers\Auth\Login;
use App\Http\Controllers\Auth\Logout;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\Register;
use App\Http\Controllers\CeritaController;
use App\Http\Controllers\ProvinsiController;
use App\Http\Controllers\Auth\ActivationEmail;
use App\Http\Controllers\StoryMediaController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/register', [Register::class, 'Register'])->name('register');
Route::get('/activate/{token}', [ActivationEmail::class, 'activate']);
Route::post('/login', [Login::class, 'login']);
Route::post('/auth/google', [Login::class, 'SocialAccount'])->name('google.login');

Route::get('cerita', [CeritaController::class, 'index']);
Route::get('cerita/slug/{slug}', [CeritaController::class, 'showBySlug']);
Route::get('cerita/{cerita}', [CeritaController::class, 'show']);

// Cerita Media
Route::get('cerita/{cerita}/media', [StoryMediaController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [Logout::class, 'logout']);

    //Provinsi
    Route::get('/provinsi', [ProvinsiController::class, 'index']);
    Route::get('/provinsi/{id}', [ProvinsiController::class, 'show']);
    Route::post('/provinsi', [ProvinsiController::class, 'store']);
    Route::put('/provinsi/{id}', [ProvinsiController::class, 'update']);
    Route::delete('/provinsi/{id}', [ProvinsiController::class, 'destroy']);

    // Cerita
    Route::post('cerita', [CeritaController::class, 'store']);
    Route::put('cerita/{ceritum}', [CeritaController::class, 'update']);
    Route::delete('cerita/{ceritum}', [CeritaController::class, 'destroy']);
    // Workflow Cerita
    Route::post('cerita/{ceritum}/approve', [CeritaController::class, 'approve']); // admin
    Route::post('cerita/{ceritum}/reject', [CeritaController::class, 'reject']);   // admin
    Route::post('cerita/{ceritum}/publish', [CeritaController::class, 'publish']); // owner/admin

    // Story Media
    Route::post('cerita/{cerita}/media', [StoryMediaController::class, 'store']);
    Route::patch('cerita/{cerita}/media/{media}', [StoryMediaController::class, 'update']);
    Route::delete('cerita/{cerita}/media/{media}', [StoryMediaController::class, 'destroy']);
    Route::post('cerita/{cerita}/media/reorder', [StoryMediaController::class, 'reorder']);
});