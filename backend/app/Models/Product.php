<?php

// app/Models/Product.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand_id',
        'model_name',
        'description',
        'sku',
        'category',
        'quantity',
        'feature_imageUrl',
        'all_imageUrls',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function purchaseOrderItems()
    {
        return $this->hasMany(PurchaseOrderItem::class);
    }

    public function listings()
    {
        return $this->hasMany(Listing::class);
    }

    public function category()
    {
        return $this->belongsTo(ProductCategory::class, "category");
    }
}
