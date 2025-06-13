<?php

namespace App\Http\Controllers;

use App\Models\ExpenseCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExpenseCategoryController extends Controller
{
    /**
     * Display a filtered listing of the expense categories.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = ExpenseCategory::query();

        // Filter by category_name
        if ($request->has('category_name')) {
            $query->where('category_name', 'like', '%' . $request->category_name . '%');
        }

        // Filter by description
        if ($request->has('description')) {
            $query->where('description', 'like', '%' . $request->description . '%');
        }

        // Filter by is_active
        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }

        // Apply limit and offset for pagination
        $limit = $request->input('limit', 10);
        $offset = $request->input('offset', 0);
        $categories = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));

        return response()->json([
            'data' => $categories,
            'limit' => (int)$limit,
            'offset' => (int)$offset,
            'count' => $categories->count(),
            'total' => $query->count(),
        ]);
    }

    /**
     * Store a newly created expense category in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_name' => 'required|string|max:50|unique:expense_categories',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $category = ExpenseCategory::create($validator->validated());

        return response()->json($category, 201);
    }

    /**
     * Display the specified expense category.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = ExpenseCategory::find($id);

        if (!$category) {
            return response()->json(['message' => 'Expense category not found'], 404);
        }

        return response()->json($category);
    }

    /**
     * Update the specified expense category in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $category = ExpenseCategory::find($id);

        if (!$category) {
            return response()->json(['message' => 'Expense category not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'category_name' => 'string|max:50|unique:expense_categories,category_name,' . $id,
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $category->update($validator->validated());

        return response()->json($category);
    }

    /**
     * Remove the specified expense category from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = ExpenseCategory::find($id);

        if (!$category) {
            return response()->json(['message' => 'Expense category not found'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Expense category deleted successfully']);
    }
}