<?php

namespace App\Http\Controllers;

use App\Models\DeliveryNoteItem;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class DeliveryNoteItemController extends Controller
{
    /**
     * Display a listing of the resource with filtering and pagination.
     */
    public function index(Request $request)
    {
        $query = DeliveryNoteItem::query();

        // Apply filters for each field
        if ($request->has('delivery_note_id')) {
            $query->where('delivery_note_id', $request->delivery_note_id);
        }

        if ($request->has('inventory_id')) {
            $query->where('inventory_id', $request->inventory_id);
        }

        if ($request->has('quantity')) {
            $query->where('quantity', $request->quantity);
        }

        if ($request->has('description')) {
            $query->where('description', 'like', '%' . $request->description . '%');
        }

        if ($request->has('is_active') && in_array($request->is_active, ['true', 'false', '1', '0'])) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        // Get limit and offset from request or use defaults
        $limit = $request->input('limit', 10);
        $offset = $request->input('offset', 0);
        $deliveryNoteItems = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
    
        // Get total count before pagination
        $total = $query->count();


        return response()->json([
            'data' => $deliveryNoteItems,
            'meta' => [
                'limit' => (int)$limit,
                'offset' => (int)$offset,
                'total' => $query->count(),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'delivery_note_id' => 'required|exists:delivery_notes,id',
            'inventory_id' => 'required|exists:inventory,id',
            'quantity' => 'required|integer|min:1',
            'description' => 'nullable|string',
            'is_active' => 'sometimes|boolean',
        ]);

        $deliveryNoteItem = DeliveryNoteItem::create($validated);

        return response()->json($deliveryNoteItem, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(DeliveryNoteItem $deliveryNoteItem)
    {
        return response()->json($deliveryNoteItem);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DeliveryNoteItem $deliveryNoteItem)
    {
        $validated = $request->validate([
            'delivery_note_id' => 'sometimes|exists:delivery_notes,id',
            'inventory_id' => 'sometimes|exists:inventory,id',
            'quantity' => 'sometimes|integer|min:1',
            'description' => 'nullable|string',
            'is_active' => 'sometimes|boolean',
        ]);

        $deliveryNoteItem->update($validated);

        return response()->json($deliveryNoteItem);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeliveryNoteItem $deliveryNoteItem)
    {
        $deliveryNoteItem->delete();

        return response()->json(null, 204);
    }
}