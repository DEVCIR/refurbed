<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
class CreateListingHistoryTable extends Migration
{
    public function up()
    {
        Schema::create('listing_history', function (Blueprint $table) {
            $table->id();
            $table->foreignId('listing_id')->constrained('listings');
            $table->string('action', 50);
            $table->text('details')->nullable();
            $table->foreignId('changed_by')->constrained('users');
            $table->timestamp('change_date')->useCurrent();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('listing_history');
    }
}