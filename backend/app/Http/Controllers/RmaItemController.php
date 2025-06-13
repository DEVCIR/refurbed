<?php

namespace App\Http\Controllers;

use App\Models\RmaItem;
use Illuminate\Http\Request;

class RmaItemController extends Controller
{
    // Get all RMA items with filters & pagination (limit & offset)
    public function index(Request $request)
    {
        $query = RmaItem::with('rma.customer.user', 'rma.order', 'inventory.variant.product');

        // Apply filters if provided
        if ($request->has('id')) {
            $query->where('id', $request->id);
        }
        if ($request->has('rma_id')) {
            $query->where('rma_id', $request->rma_id);
        }
        if ($request->has('inventory_id')) {
            $query->where('inventory_id', $request->inventory_id);
        }
        if ($request->has('quantity')) {
            $query->where('quantity', $request->quantity);
        }
        if ($request->has('reason')) {
            $query->where('reason', 'LIKE', "%{$request->reason}%");
        }
        if ($request->has('condition_received')) {
            $query->where('condition_received', 'LIKE', "%{$request->condition_received}%");
        }
        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        // Pagination using limit & offset
        $limit = $request->get('limit', 10);
        $offset = $request->get('offset', 0);

        $rmaItems = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        $total = $query->count();

        return response()->json([
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
            'data' => $rmaItems
        ]);
    }

    // Store a new RMA item
    public function store(Request $request)
    {
        $request->validate([
            'rma_id' => 'required|exists:rmas,id',
            'inventory_id' => 'required|exists:inventory,id',
            'quantity' => 'required|integer|min:1',
            'reason' => 'nullable|string',
            'condition_received' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $rmaItem = RmaItem::create($request->all());

        return response()->json($rmaItem, 201);
    }

    // Update an existing RMA item
    public function update(Request $request, RmaItem $rmaItem)
    {
        $request->validate([
            'rma_id' => 'exists:rmas,id',
            'inventory_id' => 'exists:inventory,id',
            'quantity' => 'integer|min:1',
            'reason' => 'string',
            'condition_received' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $rmaItem->update($request->all());

        return response()->json($rmaItem);
    }

    // Delete an RMA item
    public function destroy(RmaItem $rmaItem)
    {
        $rmaItem->delete();

        return response()->json(['message' => 'RMA item deleted successfully']);
    }
}
