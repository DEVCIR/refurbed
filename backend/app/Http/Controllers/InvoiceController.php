<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Invoice::with(['order.items.inventory.variant.product', 'customer.user', 'createdBy']);

        if ($request->has('id')) {
            $query->where('id', $request->id);
        }
        if ($request->has('invoice_number')) {
            $query->where('invoice_number', 'LIKE', "%{$request->invoice_number}%");
        }
        if ($request->has('order_id')) {
            $query->where('order_id', $request->order_id);
        }
        if ($request->has('customer_id')) {
            $query->where('customer_id', $request->customer_id);
        }
     

        if ($request->has('invoice_number')) {
            $query->where('invoice_number', $request->invoice_number); 
        }

        if ($request->has('due_date')) {
            $query->whereDate('due_date', $request->due_date);
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

        if ($request->has('name')) {
            $query->whereHas('customer.user', function($q) use ($request) {
                $q->where('name', 'LIKE', "%{$request->name}%")
                  ->orWhere('last_name', 'LIKE', "%{$request->name}%");
            });
        }
        
        if ($request->has('email')) {
            $query->whereHas('customer.user', function($q) use ($request) {
                $q->where('email', 'LIKE', "%{$request->email}%");
            });
        }

        $limit = $request->get('limit', 10);
        $offset = $request->get('offset', 0);

        $invoices = $query->paginate($limit, ['*'], 'page', ceil(($offset + 1) / $limit));
        $total = $query->count();

        return response()->json([
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset,
            'data' => $invoices
        ]);
    }



    // Store a new invoice
    public function store(Request $request)
    {
        $request->validate([
            'invoice_number' => 'required|string|max:30|unique:invoices,invoice_number',
            'order_id' => 'nullable|exists:orders,id',
            'customer_id' => 'required|exists:customers,id',
            'invoice_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:invoice_date',
            'status' => 'required|in:Draft,Sent,Paid,Overdue,Cancelled',
            'template_used' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
            'created_by' => 'required|exists:users,id',
            'is_active' => 'boolean'
        ]);

        $invoice = Invoice::create($request->all());

        return response()->json($invoice, 201);
    }


    public function update(Request $request, Invoice $invoice)
    {
        $request->validate([
            'invoice_number' => 'string|max:30|unique:invoices,invoice_number,' . $invoice->id,
            'order_id' => 'nullable|exists:orders,id',
            'customer_id' => 'exists:customers,id',
            'invoice_date' => 'date',
            'due_date' => 'date|after_or_equal:invoice_date',
            'status' => 'in:Draft,Sent,Paid,Overdue,Cancelled',
            'template_used' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
            'created_by' => 'exists:users,id',
            'is_active' => 'boolean'
        ]);

        $invoice->update($request->all());

        return response()->json($invoice);
    }


    // Delete an invoice
    public function destroy(Invoice $invoice)
    {
        $invoice->delete();

        return response()->json(['message' => 'Invoice deleted successfully']);
    }
}
