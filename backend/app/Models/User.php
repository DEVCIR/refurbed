<?php

// app/Models/User.php
namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'last_name',
        'phone_number',
        'role',
        'profile_picture',
        'is_active',
        'last_login'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active' => 'boolean',
        'last_login' => 'datetime',
    ];

    // Relationships
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'user_permissions')
            ->withPivot('is_active')
            ->withTimestamps();
    }

    public function supplier()
    {
        return $this->hasOne(Supplier::class);
    }

    public function customer()
    {
        return $this->hasOne(Customer::class);
    }

    public function createdPurchaseOrders()
    {
        return $this->hasMany(PurchaseOrder::class, 'created_by');
    }

    public function createdOrders()
    {
        return $this->hasMany(Order::class, 'created_by');
    }

    public function createdInvoices()
    {
        return $this->hasMany(Invoice::class, 'created_by');
    }

    public function createdCreditNotes()
    {
        return $this->hasMany(CreditNote::class, 'created_by');
    }

    public function createdEmailCampaigns()
    {
        return $this->hasMany(EmailCampaign::class, 'created_by');
    }

    public function createdDeliveryNotes()
    {
        return $this->hasMany(DeliveryNote::class, 'created_by');
    }

    public function inventoryHistoryChanges()
    {
        return $this->hasMany(InventoryHistory::class, 'changed_by');
    }

    public function listingHistoryChanges()
    {
        return $this->hasMany(ListingHistory::class, 'changed_by');
    }

    public function generatedReports()
    {
        return $this->hasMany(GeneratedReport::class, 'generated_by');
    }

    public function recordedExpenses()
    {
        return $this->hasMany(Expense::class, 'recorded_by');
    }
}