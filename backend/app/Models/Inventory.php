<?php

// app/Models/Inventory.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $table = 'inventory';

    protected $fillable = [
        'variant_id',
        'imei',
        'serial_no',
        'barcode',
        'condition',
        'purchase_price',
        'selling_price',
        'discount_type',
        'discount_price',
        'wholesale_price',
        'purchase_order_no',
        'supplier_id',
        'stock_status',
        'date_purchased',
        'date_sold',
        'notes',
        'location',
        'is_active'
    ];

    protected $casts = [
        'purchase_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
        'wholesale_price' => 'decimal:2',
        'date_purchased' => 'date',
        'date_sold' => 'date',
        'is_active' => 'boolean'
    ];

    public function variant()
    {
        return $this->belongsTo(ProductVariant::class, 'variant_id');
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function history()
    {
        return $this->hasMany(InventoryHistory::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function invoiceItems()
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function rmaItems()
    {
        return $this->hasMany(RmaItem::class);
    }

    public function creditNoteItems()
    {
        return $this->hasMany(CreditNoteItem::class);
    }

    public function deliveryNoteItems()
    {
        return $this->hasMany(DeliveryNoteItem::class);
    }
}