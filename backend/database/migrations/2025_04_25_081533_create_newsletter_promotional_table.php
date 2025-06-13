<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('newsletter_promotional', function (Blueprint $table) {
            $table->id();
            $table->string('subject_line');
            $table->text('content');
            $table->json('recipients');
            $table->timestamp('schedule_date')->nullable();
            $table->timestamp('sending_date')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('newsletter_promotional');
    }
};