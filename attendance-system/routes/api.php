<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\YoungStudentController;
use App\Http\Controllers\ElderStudentController;
use App\Http\Controllers\SchoolClassController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum', 'role:admin'])->get('/admin-only', fn() => 'Admin area');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::middleware(['role:admin,data_manager'])->group(function () {
        Route::apiResource('young-students', YoungStudentController::class);
        Route::apiResource('elder-students', ElderStudentController::class);
    });

    // Optional: View-only routes for other roles
    Route::get('young-students', [YoungStudentController::class, 'index'])->middleware('role:super_user,attendance_recorder_young');
    Route::get('elder-students', [ElderStudentController::class, 'index'])->middleware('role:super_user,attendance_recorder_elder');
});

Route::middleware(['auth:sanctum', 'role:admin,data_manager'])->group(function () {
    Route::apiResource('classes', SchoolClassController::class);
});

