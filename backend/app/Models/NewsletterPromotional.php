<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsletterPromotional extends Model
{
    use HasFactory;

    protected $table = 'newsletter_promotional';

    protected $fillable = [
        'subject_line',
        'content',
        'recipients',
        'schedule_date',
        'sending_date'
    ];

    protected $casts = [
        'recipients' => 'array', 
        'schedule_date' => 'datetime',
        'sending_date' => 'datetime',
    ];
}