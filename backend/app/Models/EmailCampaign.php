<?php

// app/Models/EmailCampaign.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailCampaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'template_id',
        'campaign_name',
        'subject',
        'content',
        'scheduled_time',
        'status',
        'sent_count',
        'open_count',
        'click_count',
        'created_by',
        'is_active'
    ];

    protected $casts = [
        'scheduled_time' => 'datetime',
        'is_active' => 'boolean'
    ];

    public function template()
    {
        return $this->belongsTo(EmailTemplate::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function recipients()
    {
        return $this->hasMany(CampaignRecipient::class);
    }
}