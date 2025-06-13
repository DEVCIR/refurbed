<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    // Get all order items with filters & pagination (limit & offset)
    public function index(Request $request)
    {
        $query = OrderItem::with('order', 'inventory.variant.product');

        // Apply filters if provided
        if ($request->has('id')) {
            $query->where('id', $request->id);
        }
        if ($request->has('order_id')) {
            $query->where('order_id', $request->order_id);
        }
        if ($request->has('inventory_id')) {
            $query->where('inventory_id', $request->inventory_id);
        }
        if ($request->has('quantity')) {
            $query->where('quantity', $request->quantity);
        }
        if ($request->has('unit_price')) {
            $query->where('unit_price', $request->unit_price);
        }
        if ($request->has('discount_amount')) {
            $query->where('discount_amount', $request->discount_amount);
        }
        if ($request->has('total_price')) {
            $query->where('total_price', $request->total_price);
        }
        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        // Pagination using limit & offset
        $limit = $request->get('limit', 10);
        $offset = $request->get('offset', 0);

        $orderItems = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        $total = $query->count();

        return response()->json([
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
            'data' => $orderItems
        ]);
    }

    // Store a new order item
    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'inventory_id' => 'required|exists:inventory,id',
            'quantity' => 'required|integer|min:1',
            'unit_price' => 'required|numeric|min:0',
            'discount_amount' => 'numeric|min:0',
            'total_price' => 'required|numeric|min:0',
            'is_active' => 'boolean'
        ]);

        $orderItem = OrderItem::create($request->all());

        return response()->json($orderItem, 201);
    }

    // Update an existing order item
    public function update(Request $request, OrderItem $orderItem)
    {
        $request->validate([
            'order_id' => 'sometimes|exists:orders,id',
            'inventory_id' => 'sometimes|exists:inventory,id',
            'quantity' => 'sometimes|integer|min:1',
            'unit_price' => 'sometimes|numeric|min:0',
            'discount_amount' => 'sometimes|numeric|min:0',
            'total_price' => 'sometimes|numeric|min:0',
            'is_active' => 'sometimes|boolean'
        ]);

        $orderItem->update($request->all());

        return response()->json($orderItem);
    }

    // Delete an order item
    public function destroy(OrderItem $orderItem)
    {
        $orderItem->delete();

        return response()->json(['message' => 'Order Item deleted successfully']);
    }
}
