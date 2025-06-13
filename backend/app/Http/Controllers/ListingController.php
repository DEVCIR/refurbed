<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use Illuminate\Http\Request;

class ListingController extends Controller
{
    // Get all listings with filters & pagination (limit & offset)
    public function index(Request $request)
    {
        $query = Listing::with('marketplace', 'product');

        // Apply filters if provided
        if ($request->has('id')) {
            $query->where('id', $request->id);
        }
        if ($request->has('marketplace_id')) {
            $query->where('marketplace_id', $request->marketplace_id);
        }
        if ($request->has('product_id')) {
            $query->where('product_id', $request->product_id);
        }
        if ($request->has('listing_reference')) {
            $query->where('listing_reference', 'LIKE', "%{$request->listing_reference}%");
        }
        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        // Pagination using limit & offset
        $limit = $request->get('limit', 10);
        $offset = $request->get('offset', 0);

        $listings = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        $total = $query->count();

        return response()->json([
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
            'data' => $listings
        ]);
    }

    // Store a new listing
    public function store(Request $request)
    {
        $request->validate([
            'marketplace_id' => 'required|exists:marketplaces,id',
            'product_id' => 'required|exists:products,id',
            'listing_reference' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $listing = Listing::create($request->all());

        return response()->json($listing, 201);
    }

    // Update an existing listing
    public function update(Request $request, Listing $listing)
    {
        $request->validate([
            'marketplace_id' => 'exists:marketplaces,id',
            'product_id' => 'exists:products,id',
            'listing_reference' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $listing->update($request->all());

        return response()->json($listing);
    }

    // Delete a listing
    // public function destroy(Listing $listing)
    // {
    //     $listing->delete();

    //     return response()->json(['message' => 'Listing deleted successfully']);
    // }

    public function destroy(Listing $listing)
{
    // First delete all related history records
    $listing->history()->delete();
    
    // Then delete the listing itself
    $listing->delete();

    return response()->json(['message' => 'Listing and its history deleted successfully']);
}

    // Get a single listing by ID
public function show(Listing $listing)
{
    $listing->load('marketplace', 'product');
    
    return response()->json($listing);
}
}
