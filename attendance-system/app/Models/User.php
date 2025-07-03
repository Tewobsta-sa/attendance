<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isAdmin() {
        return $this->role === 'admin';
    }

    public function isSuperUser() {
        return $this->role === 'super_user';
    }

    public function isStudentDataManager() {
        return $this->role === 'data_manager';
    }

    public function isAttendanceRecorder() {
        return $this->role === 'attendance_recorder';
    }

    public const ROLE_ADMIN = 'admin';
    public const ROLE_SUPER_USER = 'super_user';
    public const ROLE_DATA_MANAGER = 'data_manager';
    public const ROLE_RECORDER_YOUNG = 'attendance_recorder_young';
    public const ROLE_RECORDER_ELDER = 'attendance_recorder_elder';

}
