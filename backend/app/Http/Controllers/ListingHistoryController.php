<?php

namespace App\Http\Controllers;

use App\Models\ListingHistory;
use Illuminate\Http\Request;

class ListingHistoryController extends Controller
{
    // Get all history with filters & pagination (limit & offset)
    public function index(Request $request)
    {
        $query = ListingHistory::with('listing', 'changedBy');

        // Apply filters if provided
        if ($request->has('id')) {
            $query->where('id', $request->id);
        }
        if ($request->has('listing_id')) {
            $query->where('listing_id', $request->listing_id);
        }
        if ($request->has('action')) {
            $query->where('action', 'LIKE', "%{$request->action}%");
        }
        if ($request->has('changed_by')) {
            $query->where('changed_by', $request->changed_by);
        }
        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }
        if ($request->has('change_date')) {
            $query->whereDate('change_date', $request->change_date);
        }

        // Pagination using limit & offset
        $limit = $request->get('limit', 10);
        $offset = $request->get('offset', 0);

        $history = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        $total = $query->count();   

        return response()->json([
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
            'data' => $history
        ]);
    }

    // Store a new history record
    public function store(Request $request)
    {
        $request->validate([
            'listing_id' => 'required|exists:listings,id',
            'action' => 'required|string|max:50',
            'details' => 'nullable|string',
            'changed_by' => 'required|exists:users,id',
            'is_active' => 'boolean'
        ]);

        $history = ListingHistory::create($request->all());

        return response()->json($history, 201);
    }

    // Update an existing history record
    public function update(Request $request, ListingHistory $history)
    {
        $request->validate([
            'listing_id' => 'sometimes|exists:listings,id',
            'action' => 'sometimes|string|max:50',
            'details' => 'sometimes|string',
            'changed_by' => 'sometimes|exists:users,id',
            'is_active' => 'sometimes|boolean'
        ]);

        $history->update($request->all());

        return response()->json($history);
    }

    // Delete a history record
    public function destroy(ListingHistory $history)
    {
        $history->delete();

        return response()->json(['message' => 'Listing history deleted successfully']);
    }
}
