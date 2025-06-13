<?php

// app/Models/Marketplace.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marketplace extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'api_credentials',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function listings()
    {
        return $this->hasMany(Listing::class);
    }
}