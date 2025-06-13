<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InventoryHistory;

class InventoryHistoryController extends Controller
{
    // GET: List Inventory History with Filtering & Pagination
    public function index(Request $request)
    {
        $query = InventoryHistory::with('inventory.variant.product.brand', 'changedBy');
        
        if ($request->has('id')) {
            $query->where('id', $request->id);
        }
        if ($request->has('inventory_id')) {
            $query->where('inventory_id', $request->inventory_id);
        }
        if ($request->has('field_changed')) {
            $query->where('field_changed', 'LIKE', "%{$request->field_changed}%");
        }
        if ($request->has('changed_by')) {
            $query->where('changed_by', $request->changed_by);
        }
        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }
        
        $limit = $request->input('limit', 10);
        $offset = $request->input('offset', 0);

        $inventoryHistory = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        $total = $query->count();

        return response()->json([
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
            'data' => $inventoryHistory
        ]);
    }

    // POST: Create Inventory History Record
    public function store(Request $request)
    {
        $validated = $request->validate([
            'inventory_id' => 'required|exists:inventory,id',
            'field_changed' => 'required|string|max:50',
            'old_value' => 'nullable|string',
            'new_value' => 'nullable|string',
            'changed_by' => 'required|exists:users,id',
            'is_active' => 'boolean'
        ]);
        
        $history = InventoryHistory::create($validated);
        return response()->json($history, 201);
    }
    
    // PUT: Update Inventory History Record
    public function update(Request $request, InventoryHistory $history)
    {
        $validated = $request->validate([
            'inventory_id' => 'sometimes|inventory_id|exists:inventory,id',
            'field_changed' => 'sometimes|string|max:50',
            'old_value' => 'sometimes|string',
            'new_value' => 'sometimes|string',
            'is_active' => 'boolean'
        ]);
        
        $history->update($validated);
        return response()->json($history);
    }

    // DELETE: Remove Inventory History Record
    public function destroy(InventoryHistory $history)
    {
        $history->delete();
        return response()->json(['message' => 'Record deleted successfully']);
    }
}
