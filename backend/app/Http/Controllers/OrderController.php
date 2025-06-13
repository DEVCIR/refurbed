<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a paginated listing of orders with filtering.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Order::with("customer.user", "createdBy");

        // Filter by order_number
        if ($request->has('order_number')) {
            $query->where('order_number', 'like', '%' . $request->order_number . '%');
        }

        // Filter by customer_id
        if ($request->has('customer_id')) {
            $query->where('customer_id', $request->customer_id);
        }

        // Filter by order_date
        if ($request->has('order_date')) {
            $query->whereDate('order_date', $request->order_date);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by total_amount
        if ($request->has('total_amount')) {
            $query->where('total_amount', $request->total_amount);
        }

        // Filter by discount_amount
        if ($request->has('discount_amount')) {
            $query->where('discount_amount', $request->discount_amount);
        }

        // Filter by tax_amount
        if ($request->has('tax_amount')) {
            $query->where('tax_amount', $request->tax_amount);
        }

        // Filter by shipping_amount
        if ($request->has('shipping_amount')) {
            $query->where('shipping_amount', $request->shipping_amount);
        }

        // Filter by grand_total
        if ($request->has('grand_total')) {
            $query->where('grand_total', $request->grand_total);
        }

        // Filter by payment_method
        if ($request->has('payment_method')) {
            $query->where('payment_method', 'like', '%' . $request->payment_method . '%');
        }

        // Filter by payment_status
        if ($request->has('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }

        // Filter by shipping_address
        if ($request->has('shipping_address')) {
            $query->where('shipping_address', 'like', '%' . $request->shipping_address . '%');
        }

        // Filter by created_by
        if ($request->has('created_by')) {
            $query->where('created_by', $request->created_by);
        }

        // Filter by is_active
        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }

        // Pagination with limit and offset
        $limit = $request->input('limit', 10);
        $offset = $request->input('offset', 0);
        $orders = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
    
        // Get total count before pagination
        $total = $query->count();

        return response()->json([
            'data' => $orders,
            'meta' => [
                'limit' => (int)$limit,
                'offset' => (int)$offset,
                'total' => $query->count(),
            ]
        ]);
    }

    /**
     * Store a newly created order in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'order_number' => 'required|string|max:30|unique:orders',
            'customer_id' => 'nullable|exists:customers,id',
            'voucher_id' => 'nullable|exists:vouchers,id',
            'order_date' => 'nullable|date',
            'status' => 'required|in:Pending,Processing,Shipped,Delivered,Cancelled,Returned',
            'total_amount' => 'required|numeric|between:0,99999999.99',
            'discount_amount' => 'nullable|numeric|between:0,99999999.99',
            'tax_amount' => 'nullable|numeric|between:0,99999999.99',
            'shipping_amount' => 'nullable|numeric|between:0,99999999.99',
            'grand_total' => 'required|numeric|between:0,99999999.99',
            'payment_method' => 'nullable|string|max:50',
            'payment_status' => 'required|in:Unpaid,Partial,Paid',
            'shipping_address' => 'nullable|string',
            'notes' => 'nullable|string',
            'created_by' => 'nullable|exists:users,id',
            'is_active' => 'nullable|boolean',
        ]);

        $order = Order::create($validated);

        return response()->json($order, 201);
    }

    /**
     * Display the specified order.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order = Order::findOrFail($id);
        return response()->json($order);
    }

    /**
     * Update the specified order in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $validated = $request->validate([
            'order_number' => 'sometimes|required|string|max:30|unique:orders,order_number,' . $order->id,
            'customer_id' => 'nullable|exists:customers,id',
            'voucher_id' => 'nullable|exists:vouchers,id',
            'order_date' => 'nullable|date',
            'status' => 'sometimes|required|in:Pending,Processing,Shipped,Delivered,Cancelled,Returned',
            'total_amount' => 'sometimes|required|numeric|between:0,99999999.99',
            'discount_amount' => 'nullable|numeric|between:0,99999999.99',
            'tax_amount' => 'nullable|numeric|between:0,99999999.99',
            'shipping_amount' => 'nullable|numeric|between:0,99999999.99',
            'grand_total' => 'sometimes|required|numeric|between:0,99999999.99',
            'payment_method' => 'nullable|string|max:50',
            'payment_status' => 'sometimes|required|in:Unpaid,Partial,Paid',
            'shipping_address' => 'nullable|string',
            'notes' => 'nullable|string',
            'created_by' => 'nullable|exists:users,id',
            'is_active' => 'nullable|boolean',
        ]);

        $order->update($validated);

        return response()->json($order);
    }

    /**
     * Remove the specified order from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return response()->json(null, 204);
    }
}