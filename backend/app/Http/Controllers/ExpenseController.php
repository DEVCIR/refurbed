<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExpenseController extends Controller
{
    /**
     * Display a filtered listing of expenses.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Expense::with(['category', 'recordedBy']);

        // Filter by category_id
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Filter by amount range
        if ($request->has('amount_from')) {
            $query->where('amount', '>=', $request->amount_from);
        }
        if ($request->has('amount_to')) {
            $query->where('amount', '<=', $request->amount_to);
        }

        // Filter by exact amount
        if ($request->has('amount')) {
            $query->where('amount', $request->amount);
        }

        // Filter by expense_date range
        if ($request->has('expense_date_from')) {
            $query->whereDate('expense_date', '>=', $request->expense_date_from);
        }
        if ($request->has('expense_date_to')) {
            $query->whereDate('expense_date', '<=', $request->expense_date_to);
        }

        // Filter by exact expense_date
        if ($request->has('expense_date')) {
            $query->whereDate('expense_date', $request->expense_date);
        }

        // Filter by description
        if ($request->has('description')) {
            $query->where('description', 'like', '%' . $request->description . '%');
        }

        // Filter by payment_method
        if ($request->has('payment_method')) {
            $query->where('payment_method', 'like', '%' . $request->payment_method . '%');
        }

        // Filter by reference_no
        if ($request->has('reference_no')) {
            $query->where('reference_no', 'like', '%' . $request->reference_no . '%');
        }

        // Filter by recorded_by
        if ($request->has('recorded_by')) {
            $query->where('recorded_by', $request->recorded_by);
        }

        // Filter by is_active
        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }

        // Apply sorting
        $sortField = $request->input('sort_by', 'expense_date');
        $sortDirection = $request->input('sort_dir', 'desc');
        $query->orderBy($sortField, $sortDirection);

        // Apply limit and offset for pagination
        $limit = $request->input('limit', 10);
        $offset = $request->input('offset', 0);
        $expenses = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        $total = $query->count();

        return response()->json([
            'data' => $expenses,
            'limit' => (int)$limit,
            'offset' => (int)$offset,
            'count' => $expenses->count(),
            'total' => $total,
        ]);
    }

    /**
     * Store a newly created expense in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|exists:expense_categories,id',
            'amount' => 'required|numeric|min:0',
            'expense_date' => 'required|date',
            'description' => 'nullable|string',
            'payment_method' => 'nullable|string|max:50',
            'reference_no' => 'nullable|string|max:50',
            'recorded_by' => 'required|exists:users,id',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $expense = Expense::create($validator->validated());

        return response()->json($expense, 201);
    }

    /**
     * Display the specified expense.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $expense = Expense::with(['category', 'recordedBy'])->find($id);

        if (!$expense) {
            return response()->json(['message' => 'Expense not found'], 404);
        }

        return response()->json($expense);
    }

    /**
     * Update the specified expense in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $expense = Expense::find($id);

        if (!$expense) {
            return response()->json(['message' => 'Expense not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'category_id' => 'exists:expense_categories,id',
            'amount' => 'numeric|min:0',
            'expense_date' => 'date',
            'description' => 'nullable|string',
            'payment_method' => 'nullable|string|max:50',
            'reference_no' => 'nullable|string|max:50',
            'recorded_by' => 'exists:users,id',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $expense->update($validator->validated());

        return response()->json($expense);
    }

    /**
     * Remove the specified expense from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $expense = Expense::find($id);

        if (!$expense) {
            return response()->json(['message' => 'Expense not found'], 404);
        }

        $expense->delete();

        return response()->json(['message' => 'Expense deleted successfully']);
    }
}