<?php

// app/Models/Subscriber.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'first_name',
        'last_name',
        'is_active',
        'unsubscribe_token',
        'last_contacted'
    ];

    protected $casts = [
        'subscription_date' => 'datetime',
        'is_active' => 'boolean',
        'last_contacted' => 'datetime'
    ];

    public function campaignRecipients()
    {
        return $this->hasMany(CampaignRecipient::class);
    }
}