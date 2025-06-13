<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductCategoryController extends Controller
{
    public function index()
    {
        $categories = ProductCategory::with('creator')->get();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'created_by' => 'required|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $category = ProductCategory::create($validator->validated());

        return response()->json($category, 201);
    }

    public function show($id)
    {
        $category = ProductCategory::with('creator')->find($id);
        
        if (!$category) {
            return response()->json(['message' => 'Product category not found'], 404);
        }

        return response()->json($category);
    }

    public function update(Request $request, $id)
    {
        $category = ProductCategory::find($id);
        
        if (!$category) {
            return response()->json(['message' => 'Product category not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'created_by' => 'sometimes|required|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $category->update($validator->validated());

        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = ProductCategory::find($id);
        
        if (!$category) {
            return response()->json(['message' => 'Product category not found'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Product category deleted successfully']);
    }
}