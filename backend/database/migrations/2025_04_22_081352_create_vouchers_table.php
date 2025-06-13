<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id(); 
            $table->string('voucher_code');
            $table->unsignedBigInteger('voucher_secret_id')->unique();
            $table->enum('discount_type', ['fixed', 'percentage']);
            $table->string('voucher_discount');
            $table->unsignedBigInteger('voucher_creator');
            $table->timestamps();

            $table->foreign('voucher_creator')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::dropIfExists('vouchers');
    }
};