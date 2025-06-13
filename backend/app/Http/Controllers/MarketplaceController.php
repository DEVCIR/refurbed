<?php

namespace App\Http\Controllers;

use App\Models\Marketplace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MarketplaceController extends Controller
{
    /**
     * Display a filtered listing of marketplaces.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Marketplace::query();

        // Filter by name
        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        // Filter by description
        if ($request->has('description')) {
            $query->where('description', 'like', '%' . $request->description . '%');
        }

        if ($request->has('api_credentials')) {
            $query->where('api_credentials', 'like', '%' . $request->api_credentials . '%');
        }

        // Filter by is_active
        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }

        // Apply limit and offset for pagination
        $limit = $request->input('limit', 10);
        $offset = $request->input('offset', 0);
        $marketplaces = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        $total = $query->count();

        return response()->json([
            'data' => $marketplaces,
            'limit' => (int)$limit,
            'offset' => (int)$offset,
            'count' => $marketplaces->count(),
            'total' => $total,
        ]);
    }

    /**
     * Store a newly created marketplace in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50|unique:marketplaces',
            'description' => 'nullable|string',
            'api_credentials' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $marketplace = Marketplace::create($validator->validated());

        return response()->json($marketplace, 201);
    }

    /**
     * Display the specified marketplace.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $marketplace = Marketplace::find($id);

        if (!$marketplace) {
            return response()->json(['message' => 'Marketplace not found'], 404);
        }

        return response()->json($marketplace);
    }

    /**
     * Update the specified marketplace in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $marketplace = Marketplace::find($id);

        if (!$marketplace) {
            return response()->json(['message' => 'Marketplace not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:50|unique:marketplaces,name,' . $id,
            'description' => 'nullable|string',
            'api_credentials' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $marketplace->update($validator->validated());

        return response()->json($marketplace);
    }

    /**
     * Remove the specified marketplace from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $marketplace = Marketplace::find($id);

        if (!$marketplace) {
            return response()->json(['message' => 'Marketplace not found'], 404);
        }

        $marketplace->delete();

        return response()->json(['message' => 'Marketplace deleted successfully']);
    }
}