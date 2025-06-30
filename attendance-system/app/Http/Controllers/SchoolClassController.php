<?php

namespace App\Http\Controllers;

use App\Models\SchoolClass;
use Illuminate\Http\Request;

class SchoolClassController extends Controller
{
    public function index()
    {
        return SchoolClass::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'class_name' => 'required|string|unique:school_classes',
            'description' => 'nullable|string',
        ]);

        return SchoolClass::create($validated);
    }

    public function show(SchoolClass $class)
    {
        return $class;
    }

    public function update(Request $request, SchoolClass $class)
    {
        $validated = $request->validate([
            'class_name' => 'required|string|unique:school_classes,class_name,' . $class->id,
            'description' => 'nullable|string',
        ]);

        $class->update($validated);
        return $class;
    }

    public function destroy(SchoolClass $class)
    {
        $class->delete();
        return response()->noContent();
    }
}
