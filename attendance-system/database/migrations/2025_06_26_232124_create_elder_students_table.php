<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('elder_students', function (Blueprint $table) {
            $table->id();
            $table->string('student_name');
            $table->string('student_christian_name');
            $table->integer('student_age');
            $table->string('student_educational_level');
            $table->string('student_subcity');
            $table->string('student_district');
            $table->string('student_special_place');
            $table->string('student_house_number');
            $table->string('student_emergency_responder');
            $table->string('student_phone_number');
            $table->string('student_emergency_responder_phone_number');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('elder_students');
    }
};
