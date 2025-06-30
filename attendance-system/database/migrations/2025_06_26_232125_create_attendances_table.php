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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id'); // can be elder or young
            $table->enum('student_type', ['young', 'elder']);
            $table->foreignId('class_id')->constrained('school_classes');
            $table->foreignId('user_id')->constrained('users'); // recorder
            $table->enum('status', ['present', 'absent', 'permission']);
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
