<?php

// app/Models/DeliveryNote.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryNote extends Model
{
    use HasFactory;

    protected $fillable = [
        'delivery_number',
        'order_id',
        'customer_id',
        'delivery_date',
        'shipping_method',
        'tracking_number',
        'status',
        'notes',
        'created_by',
        'is_active'
    ];

    protected $casts = [
        'delivery_date' => 'date',
        'is_active' => 'boolean'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function items()
    {
        return $this->hasMany(DeliveryNoteItem::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}