<?php

namespace App\Http\Controllers;

use App\Models\CreditNoteItem;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CreditNoteItemController extends Controller
{
    /**
     * Display a listing of the resource with filtering and pagination.
     */
    public function index(Request $request)
    {
        $query = CreditNoteItem::with(['creditNote.createdBy', 'creditNote.customer', 'creditNote.rma', 'inventory.variant.product.brand']);

        // Apply filters for each field
        if ($request->has('id')) {
            $query->where('id', $request->id);
        }

        if ($request->has('credit_note_id')) {
            $query->where('credit_note_id', $request->credit_note_id);
        }

        if ($request->has('inventory_id')) {
            $query->where('inventory_id', $request->inventory_id);
        }

        if ($request->has('description')) {
            $query->where('description', 'like', '%' . $request->description . '%');
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

        if ($request->has('is_active') && in_array($request->is_active, ['true', 'false', '1', '0'])) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        // Get limit and offset from request or use defaults
        $limit = $request->input('limit', 10);
        $offset = $request->input('offset', 0);
        $creditNoteItems = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));

        $total = $query->count();

        return response()->json([
            'data' => $creditNoteItems,
            'meta' => [
                'limit' => (int)$limit,
                'offset' => (int)$offset,
                'total' => $total,
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'credit_note_id' => 'required|exists:credit_notes,id',
            'inventory_id' => 'required|exists:inventory,id',
            'description' => 'nullable|string',
            'quantity' => 'required|integer|min:1',
            'unit_price' => 'required|numeric|min:0',
            'total_price' => 'required|numeric|min:0',
            'is_active' => 'sometimes|boolean',
        ]);

        $creditNoteItem = CreditNoteItem::create($validated);

        return response()->json($creditNoteItem, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(CreditNoteItem $creditNoteItem)
    {
        return response()->json($creditNoteItem);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CreditNoteItem $creditNoteItem)
    {
        $validated = $request->validate([
            'credit_note_id' => 'sometimes|exists:credit_notes,id',
            'inventory_id' => 'sometimes|exists:inventory,id',
            'description' => 'nullable|string',
            'quantity' => 'sometimes|integer|min:1',
            'unit_price' => 'sometimes|numeric|min:0',
            'total_price' => 'sometimes|numeric|min:0',
            'is_active' => 'sometimes|boolean',
        ]);

        $creditNoteItem->update($validated);

        // Fetch the updated data
        $updatedCreditNoteItem = CreditNoteItem::with(['creditNote.rma', 'creditNote.customer', 'creditNote.createdBy'])
            ->find($creditNoteItem->id);

        return response()->json($updatedCreditNoteItem);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CreditNoteItem $creditNoteItem)
    {
        $creditNoteItem->delete();

        return response()->json(null, 204);
    }
}