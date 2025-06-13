<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
class CreateProductsTable extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->constrained('brands');
            $table->string('model_name', 100);
            $table->text('description')->nullable();
            $table->text('sku')->nullable();
            $table->string('feature_imageUrl', 255)->nullable();
            $table->json('all_imageUrls')->nullable();
            $table->string('category', 50)->nullable();
            $table->integer('quantity')->default(1);
            $table->boolean('is_active')->default(false);
            $table->timestamps();
            
            $table->unique(['brand_id', 'model_name']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
}
