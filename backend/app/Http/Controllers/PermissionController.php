<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PermissionController extends Controller
{
    // GET: Fetch permissions with filtering and pagination
    public function index(Request $request): JsonResponse
    {
        $query = Permission::query();

        // Filtering
        if ($request->has('module_name')) {
            $query->where('module_name', 'like', '%' . $request->module_name . '%');
        }
        if ($request->has('description')) {
            $query->where('description', 'like', '%' . $request->description . '%');
        }
        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        // Pagination using limit & offset
        $limit = $request->get('limit', 10); // Default limit 10
        $offset = $request->get('offset', 0); // Default offset 0
        
        $permissions = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        $total = $query->count();

        return response()->json([
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
            'data' => $permissions
        ]);
    }

    // POST: Store a new permission
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'module_name' => 'required|string|max:50',
            'description' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $permission = Permission::create($validated);

        return response()->json(['message' => 'Permission created successfully', 'data' => $permission], 201);
    }

    // PUT: Update an existing permission
    public function update(Request $request, Permission $permission): JsonResponse
    {
        $validated = $request->validate([
            'module_name' => 'sometimes|string|max:50',
            'description' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $permission->update($validated);

        return response()->json(['message' => 'Permission updated successfully', 'data' => $permission]);
    }

    // DELETE: Remove a permission
    public function destroy(Permission $permission): JsonResponse
    {
        $permission->delete();
        return response()->json(['message' => 'Permission deleted successfully']);
    }
}
