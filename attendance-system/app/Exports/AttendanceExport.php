<?php

namespace App\Exports;

use App\Models\Attendance;
use Maatwebsite\Excel\Concerns\FromCollection;

class AttendanceExport implements FromCollection
{
    protected $filters;

    public function __construct($filters = [])
    {
        $this->filters = $filters;
    }

    public function collection()
    {
        $query = Attendance::with('class');

        if (isset($this->filters['from'], $this->filters['to'])) {
            $query->whereBetween('created_at', [$this->filters['from'], $this->filters['to']]);
        }

        return $query->get();
    }
}
