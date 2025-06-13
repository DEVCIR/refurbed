<?php

// app/Models/RmaItem.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RmaItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'rma_id',
        'inventory_id',
        'quantity',
        'reason',
        'condition_received',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function rma()
    {
        return $this->belongsTo(Rma::class);
    }

    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }
}