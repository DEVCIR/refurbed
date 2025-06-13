<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrderItem;
use Illuminate\Http\Request;

class PurchaseOrderItemController extends Controller
{
    // Get all purchase order items with filters & pagination (limit & offset)
    public function index(Request $request)
    {
        $query = PurchaseOrderItem::with('purchaseOrder', 'product', 'variant');

        // Apply filters if provided
        if ($request->has('id')) {
            $query->where('id', $request->id);
        }
        if ($request->has('po_id')) {
            $query->where('po_id', $request->po_id);
        }
        if ($request->has('product_id')) {
            $query->where('product_id', $request->product_id);
        }
        if ($request->has('variant_id')) {
            $query->where('variant_id', $request->variant_id);
        }
        if ($request->has('quantity')) {
            $query->where('quantity', $request->quantity);
        }
        if ($request->has('unit_price')) {
            $query->where('unit_price', $request->unit_price);
        }
        if ($request->has('total_price')) {
            $query->where('total_price', $request->total_price);
        }
        if ($request->has('received_quantity')) {
            $query->where('received_quantity', $request->received_quantity);
        }
        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        // Pagination using limit & offset
        $limit = $request->get('limit', 10);
        $offset = $request->get('offset', 0);

        $purchaseOrderItems = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        $total = $query->count();

        return response()->json([
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
            'data' => $purchaseOrderItems
        ]);
    }

    // Store a new purchase order item
    public function store(Request $request)
    {
        $request->validate([
            'po_id' => 'required|exists:purchase_orders,id',
            'product_id' => 'required|exists:products,id',
            'variant_id' => 'nullable|exists:product_variants,id',
            'quantity' => 'required|integer|min:1',
            'unit_price' => 'required|numeric|min:0',
            'total_price' => 'required|numeric|min:0',
            'received_quantity' => 'integer|min:0',
            'is_active' => 'boolean'
        ]);

        $purchaseOrderItem = PurchaseOrderItem::create($request->all());

        return response()->json($purchaseOrderItem, 201);
    }

    // Update an existing purchase order item
    public function update(Request $request, PurchaseOrderItem $purchaseOrderItem)
    {
        $request->validate([
            'po_id' => 'exists:purchase_orders,id',
            'product_id' => 'exists:products,id',
            'variant_id' => 'nullable|exists:product_variants,id',
            'quantity' => 'integer|min:1',
            'unit_price' => 'numeric|min:0',
            'total_price' => 'numeric|min:0',
            'received_quantity' => 'integer|min:0',
            'is_active' => 'boolean'
        ]);

        $purchaseOrderItem->update($request->all());

        return response()->json($purchaseOrderItem);
    }

    // Delete a purchase order item
    public function destroy(PurchaseOrderItem $purchaseOrderItem)
    {
        $purchaseOrderItem->delete();

        return response()->json(['message' => 'Purchase Order Item deleted successfully']);
    }
}
