<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
class CreateRmasTable extends Migration
{
    public function up()
    {
        Schema::create('rmas', function (Blueprint $table) {
            $table->id();
            $table->string('rma_number', 30)->unique();
            $table->foreignId('customer_id')->constrained('customers');
            $table->foreignId('order_id')->nullable()->constrained('orders');
            $table->timestamp('request_date')->useCurrent();
            $table->enum('status', ['Requested', 'Approved', 'Rejected', 'Processed'])->default('Requested');
            $table->text('reason');
            $table->text('resolution')->nullable();
            $table->foreignId('resolved_by')->nullable()->constrained('users');
            $table->timestamp('resolved_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rmas');
    }
}