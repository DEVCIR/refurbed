<?php

namespace App\Http\Controllers;

use App\Models\InvoiceItem;
use Illuminate\Http\Request;

class InvoiceItemController extends Controller
{
    // Get all invoice items with filters & pagination (limit & offset)
    public function index(Request $request)
    {
        $query = InvoiceItem::with('invoice', 'inventory');

        // Apply filters if provided
        if ($request->has('id')) {
            $query->where('id', $request->id);
        }
        if ($request->has('invoice_id')) {
            $query->where('invoice_id', $request->invoice_id);
        }
        if ($request->has('inventory_id')) {
            $query->where('inventory_id', $request->inventory_id);
        }
        if ($request->has('description')) {
            $query->where('description', 'LIKE', "%{$request->description}%");
        }
        if ($request->has('quantity')) {
            $query->where('quantity', $request->quantity);
        }
        if ($request->has('unit_price')) {
            $query->where('unit_price', $request->unit_price);
        }
        if ($request->has('tax_rate')) {
            $query->where('tax_rate', $request->tax_rate);
        }
        if ($request->has('total_price')) {
            $query->where('total_price', $request->total_price);
        }
        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        // Pagination using limit & offset
        $limit = $request->get('limit', 10);
        $offset = $request->get('offset', 0);

        $invoiceItems =  $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        $total = $query->count();

        return response()->json([
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
            'data' => $invoiceItems
        ]);
    }

    // Store a new invoice item
    public function store(Request $request)
    {
        $request->validate([
            'invoice_id' => 'required|exists:invoices,id',
            'inventory_id' => 'required|exists:inventory,id',
            'description' => 'nullable|string',
            'quantity' => 'required|integer|min:1',
            'unit_price' => 'required|numeric|min:0',
            'tax_rate' => 'nullable|numeric|min:0|max:100',
            'total_price' => 'required|numeric|min:0',
            'is_active' => 'boolean'
        ]);

        $invoiceItem = InvoiceItem::create($request->all());

        return response()->json($invoiceItem, 201);
    }

    // Update an existing invoice item
    public function update(Request $request, InvoiceItem $invoiceItem)
    {
        $request->validate([
            'invoice_id' => 'sometimes|exists:invoices,id',
            'inventory_id' => 'sometimes|exists:inventory,id',
            'description' => 'sometimes|string',
            'quantity' => 'sometimes|integer|min:1',
            'unit_price' => 'sometimes|numeric|min:0',
            'tax_rate' => 'sometimes|numeric|min:0|max:100',
            'total_price' => 'sometimes|numeric|min:0',
            'is_active' => 'sometimes|boolean'
        ]);

        $invoiceItem->update($request->all());

        return response()->json($invoiceItem);
    }

    // Delete an invoice item
    public function destroy(InvoiceItem $invoiceItem)
    {
        $invoiceItem->delete();

        return response()->json(['message' => 'Invoice item deleted successfully']);
    }
}
