<?php

namespace App\Http\Controllers;

use App\Models\DeliveryNote;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class DeliveryNoteController extends Controller
{
    /**
     * Display a listing of the resource with filtering and pagination.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = DeliveryNote::with('order.customer.user');

        // Apply filters for each field
        if ($request->has('delivery_number')) {
            $query->where('delivery_number', 'like', '%' . $request->delivery_number . '%');
        }

        if ($request->has('order_id')) {
            $query->where('order_id', $request->order_id);
        }

        if ($request->has('customer_id')) {
            $query->where('customer_id', $request->customer_id);
        }

        if ($request->has('delivery_date')) {
            $query->whereDate('delivery_date', $request->delivery_date);
        }

        if ($request->has('shipping_method')) {
            $query->where('shipping_method', 'like', '%' . $request->shipping_method . '%');
        }

        if ($request->has('tracking_number')) {
            $query->where('tracking_number', 'like', '%' . $request->tracking_number . '%');
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('notes')) {
            $query->where('notes', 'like', '%' . $request->notes . '%');
        }

        if ($request->has('created_by')) {
            $query->where('created_by', $request->created_by);
        }

        if ($request->has('is_active') && in_array($request->is_active, ['true', 'false', '1', '0'])) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        // Get limit and offset from request or use defaults
        $limit = $request->input('limit', 10);
        $offset = $request->input('offset', 0);
        $deliveryNotes = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));

        $total = $query->count();

        return response()->json([
            'data' => $deliveryNotes,
            'meta' => [
                'limit' => (int)$limit,
                'offset' => (int)$offset,
                'total' => $query->count(),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'delivery_number' => 'required|string|max:30|unique:delivery_notes',
            'order_id' => 'nullable|exists:orders,id',
            'customer_id' => 'required|exists:customers,id',
            'delivery_date' => 'required|date',
            'shipping_method' => 'nullable|string|max:50',
            'tracking_number' => 'nullable|string|max:50',
            'status' => ['required', Rule::in(['Preparing', 'Shipped', 'Delivered'])],
            'notes' => 'nullable|string',
            'created_by' => 'required|exists:users,id',
            'is_active' => 'sometimes|boolean',
        ]);

        $deliveryNote = DeliveryNote::create($validated);

        return response()->json($deliveryNote, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DeliveryNote  $deliveryNote
     * @return \Illuminate\Http\Response
     */
    public function show(DeliveryNote $deliveryNote)
    {
        return response()->json($deliveryNote);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DeliveryNote  $deliveryNote
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DeliveryNote $deliveryNote)
    {
        $validated = $request->validate([
            'delivery_number' => ['sometimes', 'string', 'max:30', Rule::unique('delivery_notes')->ignore($deliveryNote->id)],
            'order_id' => 'nullable|exists:orders,id',
            'customer_id' => 'sometimes|exists:customers,id',
            'delivery_date' => 'sometimes|date',
            'shipping_method' => 'nullable|string|max:50',
            'tracking_number' => 'nullable|string|max:50',
            'status' => ['sometimes', Rule::in(['Preparing', 'Shipped', 'Delivered'])],
            'notes' => 'nullable|string',
            'created_by' => 'sometimes|exists:users,id',
            'is_active' => 'sometimes|boolean',
        ]);

        $deliveryNote->update($validated);

        return response()->json($deliveryNote);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DeliveryNote  $deliveryNote
     * @return \Illuminate\Http\Response
     */
    // public function destroy(DeliveryNote $deliveryNote)
    // {
    //     $deliveryNote->delete();

    //     return response()->json(null, 204);
    // }

    // In DeliveryNoteController.php
public function destroy(DeliveryNote $deliveryNote)
{
   
    $deliveryNote->items()->delete();
    
    
    $deliveryNote->delete();

    return response()->json(null, 204);
}

}