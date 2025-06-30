<?php

namespace App\Http\Controllers;

use App\Models\ElderStudent;
use Illuminate\Http\Request;

class ElderStudentController extends Controller
{
    public function index()
    {
        return ElderStudent::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_name' => 'required|string',
            'student_christian_name' => 'required|string',
            'student_age' => 'required|integer',
            'student_educational_level' => 'required|string',
            'student_subcity' => 'required|string',
            'student_district' => 'required|string',
            'student_special_place' => 'required|string',
            'student_house_number' => 'required|string',
            'student_emergency_responder' => 'required|string',
            'student_phone_number' => 'required|string',
            'student_emergency_responder_phone_number' => 'required|string',
        ]);

        $student = ElderStudent::create($validated);
        return response()->json($student, 201);
    }

    public function show(ElderStudent $elderStudent)
    {
        return $elderStudent;
    }

    public function update(Request $request, ElderStudent $elderStudent)
    {
        $validated = $request->validate([
            'student_name' => 'sometimes|required|string',
            'student_christian_name' => 'sometimes|required|string',
            'student_age' => 'sometimes|required|integer',
            'student_educational_level' => 'sometimes|required|string',
            'student_subcity' => 'sometimes|required|string',
            'student_district' => 'sometimes|required|string',
            'student_special_place' => 'sometimes|required|string',
            'student_house_number' => 'sometimes|required|string',
            'student_emergency_responder' => 'sometimes|required|string',
            'student_phone_number' => 'sometimes|required|string',
            'student_emergency_responder_phone_number' => 'sometimes|required|string',
        ]);

        $elderStudent->update($validated);
        return response()->json($elderStudent);
    }

    public function destroy(ElderStudent $elderStudent)
    {
        $elderStudent->delete();
        return response()->noContent();
    }
}