<?php

// app/Models/ListingHistory.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListingHistory extends Model
{
    use HasFactory;

    protected $table = 'listing_history';

    protected $fillable = [
        'listing_id',
        'action',
        'details',
        'changed_by',
        'is_active'
    ];

    protected $casts = [
        'change_date' => 'datetime',
        'is_active' => 'boolean'
    ];

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }

    public function changedBy()
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}
