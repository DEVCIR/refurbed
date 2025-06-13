<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
class CreateRmaItemsTable extends Migration
{
    public function up()
    {
        Schema::create('rma_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rma_id')->constrained('rmas');
            $table->foreignId('inventory_id')->constrained('inventory');
            $table->integer('quantity')->default(1);
            $table->text('reason')->nullable();
            $table->text('condition_received')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rma_items');
    }
}