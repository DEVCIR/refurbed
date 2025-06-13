<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a paginated listing of customers with filtering.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Customer::with("user");

        // Filter by user_id
        if ($request->has('id')) {
            $query->where('id', $request->id);
        }

        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        // Filter by address
        if ($request->has('address')) {
            $query->where('address', 'like', '%' . $request->address . '%');
        }

        // Filter by city
        if ($request->has('city')) {
            $query->where('city', 'like', '%' . $request->city . '%');
        }

        // Filter by country
        if ($request->has('country')) {
            $query->where('country', 'like', '%' . $request->country . '%');
        }

        // Filter by postal_code
        if ($request->has('postal_code')) {
            $query->where('postal_code', 'like', '%' . $request->postal_code . '%');
        }

        // Filter by tax_id
        if ($request->has('tax_id')) {
            $query->where('tax_id', 'like', '%' . $request->tax_id . '%');
        }

        // Filter by customer_type
        if ($request->has('customer_type')) {
            $query->where('customer_type', $request->customer_type);
        }

        // Filter by credit_limit
        if ($request->has('credit_limit')) {
            $query->where('credit_limit', $request->credit_limit);
        }

        // Filter by is_active
        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }


        // Pagination with limit and offset
        $limit = $request->input('limit', 10);
        $offset = $request->input('offset', 0);
        $customers = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
    
        // Get total count before pagination
        $total = $query->count();

        return response()->json([
            'data' => $customers,
            'meta' => [
                'limit' => (int)$limit,
                'offset' => (int)$offset,
                'total' => $query->count(),
            ]
        ]);
    }

    /**
     * Store a newly created customer in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:50',
            'country' => 'nullable|string|max:50',
            'postal_code' => 'nullable|string|max:20',
            'tax_id' => 'nullable|string|max:50',
            'customer_type' => 'nullable|in:Retail,Wholesale',
            'credit_limit' => 'nullable|numeric|between:0,99999999.99',
            'notes' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        $customer = Customer::create($validated);

        return response()->json($customer, 201);
    }

    /**
     * Display the specified customer.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $customer = Customer::findOrFail($id);
        return response()->json($customer);
    }

    /**
     * Update the specified customer in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);

        $validated = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:50',
            'country' => 'nullable|string|max:50',
            'postal_code' => 'nullable|string|max:20',
            'tax_id' => 'nullable|string|max:50',
            'customer_type' => 'nullable|in:Retail,Wholesale',
            'credit_limit' => 'nullable|numeric|between:0,99999999.99',
            'notes' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        $customer->update($validated);

        return response()->json($customer);
    }

    /**
     * Remove the specified customer from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return response()->json(null, 204);
    }
}