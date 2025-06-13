<?php

// app/Models/CreditNoteItem.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditNoteItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'credit_note_id',
        'inventory_id',
        'description',
        'quantity',
        'unit_price',
        'total_price',
        'is_active'
    ];

    protected $casts = [
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2',
        'is_active' => 'boolean'
    ];

    public function creditNote()
    {
        return $this->belongsTo(CreditNote::class);
    }

    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }
}
