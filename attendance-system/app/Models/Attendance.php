<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = [
    'student_id',
    'student_type',
    'class_id',
    'user_id',
    'status',
];

    public function class()
    {
        return $this->belongsTo(\App\Models\SchoolClass::class, 'class_id');
    }


}
