<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
class CreateInventoryTable extends Migration
{
    public function up()
    {
        Schema::create('inventory', function (Blueprint $table) {
            $table->id();
            $table->foreignId('variant_id')->constrained('product_variants');
            $table->string('imei', 20)->unique()->nullable();
            $table->string('serial_no', 50)->unique()->nullable();
            $table->string('barcode', 50)->unique()->nullable();
            $table->enum('condition', ['Brand New', '14 Days', 'Grade A', 'Grade B', 'Grade C', 'Grade D', 'Grade E']);
            $table->decimal('purchase_price', 10, 2);
            $table->decimal('selling_price', 10, 2);
            $table->enum('discount_type', ['fixed', 'percentage'])->nullable();
            $table->decimal('discount_price', 10, 2)->nullable();
            $table->decimal('wholesale_price', 10, 2)->nullable();
            $table->string('purchase_order_no', 30)->nullable();
            $table->foreignId('supplier_id')->nullable()->constrained('suppliers');
            $table->enum('stock_status', ['In Stock', 'Sold', 'Returned', 'Defective'])->default('In Stock');
            $table->date('date_purchased')->nullable();
            $table->date('date_sold')->nullable();
            $table->text('notes')->nullable();
            $table->string('location')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('inventory');
    }
}