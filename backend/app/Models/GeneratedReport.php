<?php

// app/Models/GeneratedReport.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneratedReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'template_id',
        'report_name',
        'generated_by',
        'generation_date',
        'parameters',
        'file_path',
        'is_active'
    ];

    protected $casts = [
        'generation_date' => 'datetime',
        'is_active' => 'boolean'
    ];

    public function template()
    {
        return $this->belongsTo(ReportTemplate::class);
    }

    public function generatedBy()
    {
        return $this->belongsTo(User::class, 'generated_by');
    }
}