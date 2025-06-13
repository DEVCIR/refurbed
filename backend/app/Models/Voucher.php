<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;

    protected $fillable = [
        'voucher_code',
        'voucher_secret_id',
        'discount_type',
        'voucher_discount',
        'voucher_creator'
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'voucher_creator');
    }
}