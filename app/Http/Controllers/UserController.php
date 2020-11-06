<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function list() {
        return \App\Http\Resources\User::collection(User::all());
    }
}
