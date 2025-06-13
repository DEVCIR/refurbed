<?php

namespace App\Http\Controllers;

use App\Models\CreditNote;
use Illuminate\Http\Request;

class CreditNoteController extends Controller
{
    // Get all credit notes with filters & pagination (limit & offset)
    public function index(Request $request)
    {
        $query = CreditNote::with('rma', 'customer', 'createdBy');

        // Apply filters if provided
        if ($request->has('id')) {
            $query->where('id', $request->id);
        }
        if ($request->has('credit_note_number')) {
            $query->where('credit_note_number', 'LIKE', "%{$request->credit_note_number}%");
        }
        if ($request->has('rma_id')) {
            $query->where('rma_id', $request->rma_id);
        }
        if ($request->has('customer_id')) {
            $query->where('customer_id', $request->customer_id);
        }
        if ($request->has('issue_date')) {
            $query->whereDate('issue_date', $request->issue_date);
        }
        if ($request->has('total_amount')) {
            $query->where('total_amount', $request->total_amount);
        }
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        if ($request->has('created_by')) {
            $query->where('created_by', $request->created_by);
        }
        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        // Pagination using limit & offset
        $limit = $request->get('limit', 10);
        $offset = $request->get('offset', 0);

        $creditNotes = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        $total = $query->count();

        return response()->json([
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
            'data' => $creditNotes
        ]);
    }

    // Store a new credit note
    public function store(Request $request)
    {
        $request->validate([
            'credit_note_number' => 'required|string|max:30|unique:credit_notes,credit_note_number',
            'rma_id' => 'nullable|exists:rmas,id',
            'customer_id' => 'required|exists:customers,id',
            'issue_date' => 'required|date',
            'total_amount' => 'required|numeric|min:0',
            'status' => 'required|in:Draft,Issued,Applied,Cancelled',
            'notes' => 'nullable|string',
            'created_by' => 'required|exists:users,id',
            'is_active' => 'boolean'
        ]);

        $creditNote = CreditNote::create($request->all());

        return response()->json($creditNote, 201);
    }

    // Update an existing credit note
    public function update(Request $request, CreditNote $creditNote)
    {
        $request->validate([
            'credit_note_number' => 'sometimes|string|max:30|unique:credit_notes,credit_note_number,' . $creditNote->id,
            'rma_id' => 'sometimes|exists:rmas,id',
            'customer_id' => 'sometimes|exists:customers,id',
            'issue_date' => 'sometimes|date',
            'total_amount' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|in:Draft,Issued,Applied,Cancelled',
            'notes' => 'sometimes|string',
            'created_by' => 'sometimes|exists:users,id',
            'is_active' => 'sometimes|boolean'
        ]);

        $creditNote->update($request->all());

        return response()->json($creditNote);
    }

    // Delete a credit note
    public function destroy(CreditNote $creditNote)
    {
        $creditNote->delete();

        return response()->json(['message' => 'Credit note deleted successfully']);
    }
}
