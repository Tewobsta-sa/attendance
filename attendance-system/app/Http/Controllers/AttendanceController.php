<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\YoungStudent;
use App\Models\ElderStudent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AttendanceController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|integer',
            'student_type' => 'required|in:young,elder',
            'class_id' => 'required|exists:school_classes,id',
            'status' => 'required|in:present,absent,permission',
        ]);

        // Check student exists
        $studentExists = $validated['student_type'] === 'young'
            ? YoungStudent::find($validated['student_id'])
            : ElderStudent::find($validated['student_id']);

        if (!$studentExists) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        // Prevent duplicates per day
        $exists = Attendance::where('student_id', $validated['student_id'])
            ->where('student_type', $validated['student_type'])
            ->where('class_id', $validated['class_id'])
            ->whereDate('created_at', today())
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Already recorded today.'], 409);
        }

        $attendance = Attendance::create([
            'student_id' => $validated['student_id'],
            'student_type' => $validated['student_type'],
            'class_id' => $validated['class_id'],
            'user_id' => optional(Auth::user())->id,
            'status' => $validated['status'],
        ]);

        return response()->json($attendance, 201);
    }

    public function index(Request $request)
    {
        $user = Auth::user();

        $query = Attendance::query();

        // Role-based filtering
        if ($user->role === 'attendance_recorder_young') {
            $query->where('student_type', 'young')->where('user_id', $user->id);
        } elseif ($user->role === 'attendance_recorder_elder') {
            $query->where('student_type', 'elder')->where('user_id', $user->id);
        } elseif ($user->role === 'student_young' || $user->role === 'student_elder') {
            $query->where('student_id', $user->id)->where('student_type', $user->role === 'student_young' ? 'young' : 'elder');
        }

        // Optional filters
        if ($request->filled('class_id')) {
            $query->where('class_id', $request->input('class_id'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('student_type')) {
            $query->where('student_type', $request->input('student_type'));
        }

        if ($request->filled('from') && $request->filled('to')) {
            $query->whereBetween('created_at', [
                $request->input('from'),
                $request->input('to')
            ]);
        }

        return response()->json($query->with(['class'])->latest()->paginate(20));
    }

    public function summary(Request $request)
    {
        $user = Auth::user();

        $query = Attendance::query();

        // Role-based limits
        if ($user->role === 'attendance_recorder_young') {
            $query->where('student_type', 'young')->where('user_id', $user->id);
        } elseif ($user->role === 'attendance_recorder_elder') {
            $query->where('student_type', 'elder')->where('user_id', $user->id);
        } elseif (str_starts_with($user->role, 'student')) {
            $query->where('student_id', $user->id)
                ->where('student_type', $user->role === 'student_young' ? 'young' : 'elder');
        }

        // Filters
        if ($request->filled('class_id')) {
            $query->where('class_id', $request->input('class_id'));
        }

        if ($request->filled('student_type')) {
            $query->where('student_type', $request->input('student_type'));
        }

        if ($request->filled('from') && $request->filled('to')) {
            $query->whereBetween('created_at', [
                $request->input('from'),
                $request->input('to')
            ]);
        }

        $groupBy = $request->input('group_by', 'day'); // day or month

        $result = $query
            ->selectRaw("DATE_FORMAT(created_at, ?) as period, status, COUNT(*) as total", [
                $groupBy === 'month' ? '%Y-%m' : '%Y-%m-%d'
            ])
            ->groupBy('period', 'status')
            ->orderBy('period', 'desc')
            ->get()
            ->groupBy('period');

        return response()->json($result);
    }

}

