<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    /**
     * Handle an register request.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|unique:users|email|max:255',
            'username' => 'required|alpha_dash|between:3,20',
            'password' => 'required|min:8|confirmed',
        ]);

        User::create($validatedData);

        return response()->json(['success' => true, 'message' => 'Account successfully created!']);
    }
}
