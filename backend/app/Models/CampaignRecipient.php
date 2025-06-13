<?php

// app/Models/CampaignRecipient.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampaignRecipient extends Model
{
    use HasFactory;

    protected $fillable = [
        'campaign_id',
        'subscriber_id',
        'email_address',
        'status',
        'sent_time',
        'open_time',
        'is_active'
    ];

    protected $casts = [
        'sent_time' => 'datetime',
        'open_time' => 'datetime',
        'is_active' => 'boolean'
    ];

    public function campaign()
    {
        return $this->belongsTo(EmailCampaign::class);
    }

    public function subscriber()
    {
        return $this->belongsTo(Subscriber::class);
    }
}