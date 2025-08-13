<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Auth\Login;
use App\Http\Controllers\Auth\Logout;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\Register;
use App\Http\Controllers\Auth\ActivationEmail;
use App\Models\SocialAccount;
use App\Http\Controllers\ProvinsiController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/register', [Register::class, 'Register'])->name('register');
Route::get('/activate/{token}', [ActivationEmail::class, 'activate']);
Route::post('/login', [Login::class, 'login']);
Route::post('/auth/google', [Login::class, 'SocialAccount'])->name('google.login');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [Logout::class, 'logout']);

    //Provinsi
    Route::get('/provinsi', [ProvinsiController::class, 'index']);
    Route::get('/provinsi/{id}', [ProvinsiController::class, 'show']);
    Route::post('/provinsi', [ProvinsiController::class, 'store']);
    Route::put('/provinsi/{id}', [ProvinsiController::class, 'update']);
    Route::delete('/provinsi/{id}', [ProvinsiController::class, 'destroy']);
});