<?php

namespace App\Http\Controllers;

use App\Models\Rma;
use Illuminate\Http\Request;

class RmaController extends Controller
{
    // Get all RMAs with filters & pagination (limit & offset)
    public function index(Request $request)
    {
        $query = Rma::with('customer.user', 'order', 'resolvedBy');

        // Apply filters if provided
        if ($request->has('id')) {
            $query->where('id', $request->id);
        }
        if ($request->has('rma_number')) {
            $query->where('rma_number', 'LIKE', "%{$request->rma_number}%");
        }
        if ($request->has('customer_id')) {
            $query->where('customer_id', $request->customer_id);
        }
        if ($request->has('order_id')) {
            $query->where('order_id', $request->order_id);
        }
        if ($request->has('request_date')) {
            $query->whereDate('request_date', $request->request_date);
        }
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        if ($request->has('reason')) {
            $query->where('reason', 'LIKE', "%{$request->reason}%");
        }
        if ($request->has('resolved_by')) {
            $query->where('resolved_by', $request->resolved_by);
        }
        if ($request->has('resolved_date')) {
            $query->whereDate('resolved_date', $request->resolved_date);
        }
        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        // Pagination using limit & offset
        $limit = $request->get('limit', 10);
        $offset = $request->get('offset', 0);

        $rmas = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        $total = $query->count();

        return response()->json([
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
            'data' => $rmas
        ]);
    }


    // Store a new RMA
    public function store(Request $request)
    {
        $request->validate([
            'rma_number' => 'required|string|max:30|unique:rmas',
            'customer_id' => 'required|exists:customers,id',
            'order_id' => 'nullable|exists:orders,id',
            'status' => 'required|in:Requested,Approved,Rejected,Processed',
            'reason' => 'required|string',
            'resolution' => 'nullable|string',
            'resolved_by' => 'nullable|exists:users,id',
            'resolved_date' => 'nullable|date',
            'is_active' => 'boolean'
        ]);

        $rma = Rma::create($request->all());

        return response()->json($rma, 201);
    }

    // Update an existing RMA
    public function update(Request $request, Rma $rma)
    {
        $request->validate([
            'rma_number' => 'sometimes|string|max:30|unique:rmas,rma_number,' . $rma->id,
            'customer_id' => 'sometimes|exists:customers,id',
            'order_id' => 'sometimes|exists:orders,id',
            'status' => 'sometimes|in:Requested,Approved,Rejected,Processed',
            'reason' => 'sometimes|string',
            'resolution' => 'sometimes|string',
            'resolved_by' => 'sometimes|exists:users,id',
            'resolved_date' => 'sometimes|date',
            'is_active' => 'sometimes|boolean'
        ]);

        $rma->update($request->all());

        return response()->json($rma);
    }

    // Delete an RMA
    // public function destroy(Rma $rma)
    // {
    //     $rma->delete();

    //     return response()->json(['message' => 'RMA deleted successfully']);
    // }

    // In RmaController.php
public function destroy(Rma $rma)
{
    
    $rma->items()->delete();
    
    
    $rma->delete();

    return response()->json(['message' => 'RMA and all related items deleted successfully']);
}
}
