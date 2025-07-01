<?php

namespace App\Imports;

use App\Models\ElderStudent;
use Maatwebsite\Excel\Concerns\ToModel;

class ElderStudentImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new ElderStudent([
            'student_name' => $row[0],
            'student_christian_name' => $row[1],
            'student_age' => $row[2],
            'student_educational_level' => $row[3],
            'student_subcity' => $row[4],
            'student_district' => $row[5],
            'student_special_place' => $row[6],
            'student_house_number' => $row[7],
            'student_emergency_responder' => $row[8],
            'student_phone_number' => $row[9],
            'student_emergency_responder_phone_number' => $row[10],
        ]);
    }
}
