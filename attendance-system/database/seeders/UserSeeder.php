<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

public function run()
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => User::ROLE_ADMIN,
        ]);

        User::create([
            'name' => 'Super User',
            'email' => 'super@example.com',
            'password' => Hash::make('password'),
            'role' => User::ROLE_SUPER_USER,
        ]);

        User::create([
            'name' => 'Data Manager',
            'email' => 'data@example.com',
            'password' => Hash::make('password'),
            'role' => User::ROLE_DATA_MANAGER,
        ]);

        User::create([
            'name' => 'Recorder Elder',
            'email' => 'elder@example.com',
            'password' => Hash::make('password'),
            'role' => User::ROLE_RECORDER_ELDER,
        ]);

        User::create([
            'name' => 'Recorder Young',
            'email' => 'young@example.com',
            'password' => Hash::make('password'),
            'role' => User::ROLE_RECORDER_YOUNG,
        ]);
    }

}
