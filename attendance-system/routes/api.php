<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\YoungStudentController;
use App\Http\Controllers\ElderStudentController;
use App\Http\Controllers\SchoolClassController;
use App\Http\Controllers\StudentQrCodeController;
use App\Http\Controllers\AttendanceController;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AttendanceExport;
use App\Imports\YoungStudentImport;
use App\Imports\ElderStudentImport;

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


Route::middleware(['auth:sanctum', 'role:admin,data_manager'])->get(
    'qr-code/{type}/{id}',
    [StudentQrCodeController::class, 'generate']
);

Route::middleware(['auth:sanctum', 'role:admin,data_manager,attendance_recorder_young,attendance_recorder_elder'])->post(
    'attendance/register',
    [AttendanceController::class, 'register']
);

Route::middleware(['auth:sanctum'])->get('/attendance', [AttendanceController::class, 'index']);

Route::middleware(['auth:sanctum'])->get('/attendance/summary', [AttendanceController::class, 'summary']);

Route::middleware(['auth:sanctum', 'role:admin'])->get('/attendance/export', function (Request $request) {
    $filters = $request->only(['from', 'to']);
    return Excel::download(new AttendanceExport($filters), 'attendance.xlsx');
});

Route::middleware(['auth:sanctum', 'role:admin,data_manager'])->post('/import-students/{type}', function (Request $request, $type) {
    $request->validate([
        'file' => 'required|mimes:xlsx,csv',
    ]);

    if ($type === 'young') {
        Excel::import(new YoungStudentImport, $request->file('file'));
    } else {
        Excel::import(new ElderStudentImport, $request->file('file'));
    }

    return response()->json(['message' => 'Import successful']);
});