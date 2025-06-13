<?php

namespace App\Http\Controllers;
use Illuminate\Validation\ValidationException;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // User registration
    public function register(Request $request)
    {
        try {
            // Validate request data
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255', // 'unique:users' ensures the email is not already in use
                'password' => 'required|string|min:8',
                'role' => 'in:user,admin,client,manager',
                'profile' => 'nullable|file|mimes:jpg,jpeg,png',
                'phone_number' => 'nullable|string',
                'address' => 'nullable|string',
            ]);

            // Check if the user already exists by email
            $existingUser = User::where('email', $request->email)->first();
            if ($existingUser) {
                return response()->json([
                    'message' => 'User already registered with this email.',
                ], 400); // 400 Bad Request
            }

            // Handle profile image upload (optional)
            if ($request->hasFile('profile')) {
                $profilePath = $request->file('profile')->store('profiles', 'public'); // Store in 'storage/app/public/profiles'
            } else {
                $profilePath = null;
            }

            // Create user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role ?? 'user', // Default to 'user' role
                // 'profile' => $profilePath,
                'profile' => $profilePath ?? 'null',
                'phone_number' => $request->phone_number ?? 'null',
                'address' => $request->address ?? '',
            ]);

            // Generate a token for the user
            // $token = $user->createToken('authToken')->plainTextToken;

            // Return response
            return response()->json([
                'access_token' => $request->email,
                'token_type' => 'Bearer',
                'user' => $user
            ], 201);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Return a JSON response if the type is not found
            return response()->json(["error" => $e->getMessage(), 'message' => 'amenity name Not Found'], 422);
        } catch (\Exception $e) {
            // Catch any other errors and return a general error message
            return response()->json([
                'message' => 'Something went wrong, please try again',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Login an existing user
     */
    public function login(Request $request)
    {
        // Validate request data
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Attempt to login the user
        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Generate a token for the user
        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;

        // Return response
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    /**
     * Logout the authenticated user
     */
    public function logout(Request $request)
    {
        // Revoke all tokens for the user
        $request->user()->tokens()->delete();

        // Return response
        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function user()
    {
        $users = User::where('role', 'user')->get();
        return response()->json($users);
    }


}