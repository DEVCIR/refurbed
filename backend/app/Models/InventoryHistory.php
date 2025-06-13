<?php

// app/Models/InventoryHistory.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryHistory extends Model
{
    use HasFactory;

    protected $table = 'inventory_history';

    protected $fillable = [
        'inventory_id',
        'field_changed',
        'old_value',
        'new_value',
        'changed_by',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'change_date' => 'datetime'
    ];

    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }

    public function changedBy()
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}
