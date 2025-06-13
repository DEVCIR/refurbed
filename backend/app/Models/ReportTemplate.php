<?php

// app/Models/ReportTemplate.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'template_name',
        'description',
        'template_file_path',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function generatedReports()
    {
        return $this->hasMany(GeneratedReport::class);
    }
}
