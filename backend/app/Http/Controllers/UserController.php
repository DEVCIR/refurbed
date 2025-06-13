<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Get all users with filtering and pagination
    public function index(Request $request)
    {
        $query = User::query();
    
        // Filtering
        if ($request->has('name')) {
            $query->where('name', 'LIKE', "%{$request->name}%");
        }
        if ($request->has('email')) {
            $query->where('email', $request->email);
        }
        if ($request->has('role')) {
            $query->where('role', $request->role);
        }
    
        // Get limit & offset (default values)
        $limit = $request->get('limit', 10);
        $offset = $request->get('offset', 0);
    
        // Apply offset and limit
        $users = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
    
        // Append full image URL
        $users->getCollection()->transform(function ($user) {
            if ($user->profile_picture) {
                $user->profile_picture = url(Storage::url($user->profile_picture));
            }
            return $user;
        });
    
        return response()->json($users);
    }
    

    // Store a new user
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'last_name' => 'nullable|string|max:50',
            'phone_number' => 'nullable|string|max:15',
            'role' => 'required|in:admin,manager,staff,wholesale,customer',
            'profile_picture' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'is_active' => 'boolean',
        ]);

        $data = $request->except('profile_picture');
        $data['password'] = Hash::make($request->password);

        // Handle image upload
        if ($request->hasFile('profile_picture')) {
            $imagePath = $request->file('profile_picture')->store('public/users');
            $data['profile_picture'] = str_replace('public/', 'storage/', $imagePath);
        }

        $user = User::create($data);

        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }

    // Get a single user by ID
    public function show($id)
    {
        $user = User::findOrFail($id);

        if ($user->profile_picture) {
            $user->profile_picture = url(Storage::url($user->profile_picture));
        }

        return response()->json($user);
    }

    // Update user details
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
            'last_name' => 'nullable|string|max:50',
            'phone_number' => 'nullable|string|max:15',
            'role' => 'in:admin,manager,staff,wholesale,customer',
            'profile_picture' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'is_active' => 'boolean',
        ]);

        $data = $request->except('profile_picture');

        if ($request->has('password')) {
            $data['password'] = Hash::make($request->password);
        }

        // Handle profile picture update
        if ($request->hasFile('profile_picture')) {
            // Delete old image if exists
            if ($user->profile_picture) {
                Storage::delete(str_replace('storage/', 'public/', $user->profile_picture));
            }

            $imagePath = $request->file('profile_picture')->store('public/users');
            $data['profile_picture'] = str_replace('public/', 'storage/', $imagePath);
        }

        $user->update($data);

        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }

    // Delete a user
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if ($user->profile_picture) {
            Storage::delete(str_replace('storage/', 'public/', $user->profile_picture));
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
