<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    /**
     * Display a listing of brands with filtering and pagination
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $query = Brand::query();
    
        // Apply filters
        if ($request->has('brand_name')) {
            $query->where('brand_name', 'like', '%' . $request->brand_name . '%');
        }
    
        if ($request->has('description')) {
            $query->where('description', 'like', '%' . $request->description . '%');
        }
    
        if ($request->has('is_active')) {
            // Convert any truthy value to boolean true, others to false
            $isActive = filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN);
            $query->where('is_active', $isActive);
        }
    
        // Get pagination parameters
        $limit = $request->input('limit', 10);
        $offset = $request->input('offset', 0);

        // Execute query with pagination
        $brands = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
    
        // Get total count before pagination
        $total = $query->count();
    
    
        return response()->json([
            'success' => true,
            'data' => $brands,
            'meta' => [
                'total' => $total,
                'limit' => (int)$limit,
                'offset' => (int)$offset
            ]
        ]);
    }

    /**
     * Store a newly created brand
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'brand_name' => 'required|string|max:50|unique:brands,brand_name',
            'description' => 'nullable|string',
            'is_active' => 'sometimes|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $brand = Brand::create($request->only([
            'brand_name',
            'description',
            'is_active'
        ]));

        return response()->json([
            'success' => true,
            'data' => $brand
        ], 201);
    }

    /**
     * Display the specified brand
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json([
                'success' => false,
                'message' => 'Brand not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $brand
        ]);
    }

    /**
     * Update the specified brand
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json([
                'success' => false,
                'message' => 'Brand not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'brand_name' => 'sometimes|string|max:50|unique:brands,brand_name,' . $id,
            'description' => 'nullable|string',
            'is_active' => 'sometimes|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $brand->update($request->only([
            'brand_name',
            'description',
            'is_active'
        ]));

        return response()->json([
            'success' => true,
            'data' => $brand
        ]);
    }

    /**
     * Remove the specified brand
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json([
                'success' => false,
                'message' => 'Brand not found'
            ], 404);
        }

        // Check if brand has products before deleting
        if ($brand->products()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete brand with associated products'
            ], 400);
        }

        $brand->delete();

        return response()->json([
            'success' => true,
            'message' => 'Brand deleted successfully'
        ]);
    }
}