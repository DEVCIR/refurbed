<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grading extends Model
{
    use HasFactory;

    protected $table = 'grading';

    protected $fillable = [
        'product_id',
        'product_condition'
    ];

    protected $casts = [
        'product_condition' => 'json'
    ];

    /**
     * Get the product associated with the grading.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

 
}