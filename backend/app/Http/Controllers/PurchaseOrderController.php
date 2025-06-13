<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrder;
use Illuminate\Http\Request;

class PurchaseOrderController extends Controller
{
    // Get all purchase orders with filters & pagination (limit & offset)
    public function index(Request $request)
    {
        $query = PurchaseOrder::with('supplier.user', 'createdBy');

        // Apply filters if provided
        if ($request->has('id')) {
            $query->where('id', $request->id);
        }
        if ($request->has('supplier_id')) {
            $query->where('supplier_id', $request->supplier_id);
        }
        if ($request->has('po_number')) {
            $query->where('po_number', 'LIKE', "%{$request->po_number}%");
        }
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        if ($request->has('created_by')) {
            $query->where('created_by', $request->created_by);
        }
        if ($request->has('order_date')) {
            $query->whereDate('order_date', $request->order_date);
        }
        if ($request->has('expected_delivery_date')) {
            $query->whereDate('expected_delivery_date', $request->expected_delivery_date);
        }

        // Pagination using limit & offset
        $limit = $request->get('limit', 10);
        $offset = $request->get('offset', 0);

        $purchaseOrders = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        $total = $query->count();

        return response()->json([
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
            'data' => $purchaseOrders
        ]);
    }

    // Store a new purchase order
    public function store(Request $request)
    {
        $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'po_number' => 'required|unique:purchase_orders,po_number|max:30',
            'order_date' => 'required|date',
            'expected_delivery_date' => 'nullable|date',
            'status' => 'required|in:Draft,Sent,Received,Cancelled',
            'total_amount' => 'nullable|numeric',
            'notes' => 'nullable|string',
            'created_by' => 'required|exists:users,id',
            'is_active' => 'boolean'
        ]);

        $purchaseOrder = PurchaseOrder::create($request->all());

        return response()->json($purchaseOrder, 201);
    }

    // Update an existing purchase order
    public function update(Request $request, PurchaseOrder $purchaseOrder)
    {
        $request->validate([
            'supplier_id' => 'sometimes|exists:suppliers,id',
            'po_number' => 'sometimes|unique:purchase_orders,po_number,' . $purchaseOrder->id . '|max:30',
            'order_date' => 'sometimes|date',
            'expected_delivery_date' => 'sometimes|date',
            'status' => 'sometimes|in:Draft,Sent,Received,Cancelled',
            'total_amount' => 'sometimes|numeric',
            'notes' => 'sometimes|string',
            'created_by' => 'sometimes|exists:users,id',
            'is_active' => 'sometimes|boolean'
        ]);

        $purchaseOrder->update($request->all());

        return response()->json($purchaseOrder);
    }

    // Delete a purchase order
    public function destroy(PurchaseOrder $purchaseOrder)
    {
        $purchaseOrder->delete();

        return response()->json(['message' => 'Purchase Order deleted successfully']);
    }
}
