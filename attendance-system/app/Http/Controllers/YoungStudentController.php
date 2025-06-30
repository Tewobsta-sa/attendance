<?php

namespace App\Http\Controllers;

use App\Models\YoungStudent;
use Illuminate\Http\Request;

class YoungStudentController extends Controller
{
    public function index()
    {
        return YoungStudent::all();
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
            'parent_name' => 'required|string',
            'student_phone_number' => 'required|string',
            'parent_phone_number' => 'required|string',
        ]);

        $student = YoungStudent::create($validated);
        return response()->json($student, 201);
    }

    public function show(YoungStudent $youngStudent)
    {
        return $youngStudent;
    }

    public function update(Request $request, YoungStudent $youngStudent)
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
            'parent_name' => 'sometimes|required|string',
            'student_phone_number' => 'sometimes|required|string',
            'parent_phone_number' => 'sometimes|required|string',
        ]);

        $youngStudent->update($validated);
        return response()->json($youngStudent);
    }

    public function destroy(YoungStudent $youngStudent)
    {
        $youngStudent->delete();
        return response()->noContent();
    }
}