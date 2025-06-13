<?php

namespace App\Http\Controllers;

use App\Models\UserPermission;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserPermissionController extends Controller
{
    // GET: Fetch user permissions with filtering & pagination
    public function index(Request $request): JsonResponse
    {
        $query = UserPermission::with(['user', 'permission']);

        // Filtering
        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }
        if ($request->has('permission_id')) {
            $query->where('permission_id', $request->permission_id);
        }
        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        // Pagination using limit & offset
        $limit = $request->get('limit', 10); // Default limit 10
        $offset = $request->get('offset', 0); // Default offset 0
        
        $userPermissions = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        $total = $query->count();   

        return response()->json([
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
            'data' => $userPermissions
        ]);
    }

    // POST: Assign permission to a user
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'permission_id' => 'required|exists:permissions,id',
            'is_active' => 'boolean'
        ]);

        $userPermission = UserPermission::create($validated);

        return response()->json(['message' => 'Permission assigned successfully', 'data' => $userPermission], 201);
    }

    // PUT: Update a user permission
    public function update(Request $request, UserPermission $userPermission): JsonResponse
    {
        $validated = $request->validate([
            'is_active' => 'boolean'
        ]);

        $userPermission->update($validated);

        return response()->json(['message' => 'Permission updated successfully', 'data' => $userPermission]);
    }

    // DELETE: Remove a user permission
    public function destroy(UserPermission $userPermission): JsonResponse
    {
        $userPermission->delete();
        return response()->json(['message' => 'User permission deleted successfully']);
    }
}
