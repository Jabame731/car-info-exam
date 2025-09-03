<?php

use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return view('welcome');
});

// Route::apiResource('api/products', ProductController::class);