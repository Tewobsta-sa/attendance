<?php

namespace App\Http\Controllers;

use App\Models\YoungStudent;
use App\Models\ElderStudent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\RoundBlockSizeMode;
use Endroid\QrCode\Writer\PngWriter;

class StudentQrCodeController extends Controller
{
    public function generate($type, $id)
    {
        // Validate student type
        if (!in_array($type, ['young', 'elder'])) {
            return response()->json(['message' => 'Invalid student type'], 400);
        }

        // Retrieve student
        $student = $type === 'young'
            ? YoungStudent::find($id)
            : ElderStudent::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        // Prepare QR data
        $data = json_encode([
            'id' => $student->id,
            'name' => $student->student_name,
            'type' => $type,
        ]);

        // Generate QR code with full builder constructor
        $builder = new Builder(
            writer:  new PngWriter(), // default PNG writer
            writerOptions: [],
            validateResult: false,
            data: $data,
            encoding: new Encoding('UTF-8'),
            errorCorrectionLevel: ErrorCorrectionLevel::High,
            size: 300,
            margin: 10,
            roundBlockSizeMode: RoundBlockSizeMode::Margin,
            //logoPath: null,          // no logo; add path if you want
            logoResizeToWidth: null, // no resizing needed
            logoPunchoutBackground: false
            //labelText: null,
            //labelFont: null,
            //labelAlignment: null
        );

        $result = $builder->build();

        return response($result->getString(), 200)
            ->header('Content-Type', $result->getMimeType())
            ->header('Content-Disposition', 'inline; filename="student_qrcode.png"');
    }
}
