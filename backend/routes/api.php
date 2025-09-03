<?php

use Illuminate\Http\Request;
use App\Models\SocialAccount;
use App\Http\Controllers\Auth\Login;
use App\Http\Controllers\Auth\Logout;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\Register;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CeritaController;
use App\Http\Controllers\ProvinsiController;
use App\Http\Controllers\Auth\ActivationEmail;
use App\Http\Controllers\StoryMediaController;
use App\Http\Controllers\PermintaanKontributorController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/register', [Register::class, 'Register'])->name('register');
Route::get('/activate/{token}', [ActivationEmail::class, 'activate']);
Route::post('/login', [Login::class, 'login']);
Route::post('/auth/google', [Login::class, 'SocialAccount'])->name('google.login');





Route::get('/cerita', [CeritaController::class, 'index']);

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
    Route::post('/cerita', [CeritaController::class, 'store']);
    Route::patch('/cerita/{ceritum}', [CeritaController::class, 'update']);
    Route::delete('/cerita/{ceritum}', [CeritaController::class, 'destroy']);
    Route::post('/cerita/{ceritum}/publish', [CeritaController::class, 'publish']);


    Route::get('/cerita/{ceritum}', [CeritaController::class, 'show']);
    Route::get('/cerita/slug/{slug}', [CeritaController::class, 'showBySlug']);

    // Story Media
    Route::post('cerita/{cerita}/media', [StoryMediaController::class, 'store']);
    Route::patch('cerita/{cerita}/media/{media}', [StoryMediaController::class, 'update']);
    Route::delete('cerita/{cerita}/media/{media}', [StoryMediaController::class, 'destroy']);
    Route::post('cerita/{cerita}/media/reorder', [StoryMediaController::class, 'reorder']);

    // User req kontributor
    Route::post('permintaan-kontributor', [PermintaanKontributorController::class, 'store']);
    // Admin kelola
    Route::get('permintaan-kontributor', [PermintaanKontributorController::class, 'index']);
    Route::post('permintaan-kontributor/{permintaan}/approve', [PermintaanKontributorController::class, 'approve']);
    Route::post('permintaan-kontributor/{permintaan}/reject', [PermintaanKontributorController::class, 'reject']);

    // Manage user
    Route::get('/manage-users', [UserController::class, 'index']);
    Route::delete('/manage-users/{id}', [UserController::class, 'destroy']);
});
