<?php

// app/Models/Rma.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rma extends Model
{
    use HasFactory;

    protected $fillable = [
        'rma_number',
        'customer_id',
        'order_id',
        'request_date',
        'status',
        'reason',
        'resolution',
        'resolved_by',
        'resolved_date',
        'is_active'
    ];

    protected $casts = [
        'request_date' => 'datetime',
        'resolved_date' => 'datetime',
        'is_active' => 'boolean'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function items()
    {
        return $this->hasMany(RmaItem::class);
    }

    public function resolvedBy()
    {
        return $this->belongsTo(User::class, 'resolved_by');
    }

    public function creditNotes()
    {
        return $this->hasMany(CreditNote::class);
    }
}