<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
class CreateCreditNotesTable extends Migration
{
    public function up()
    {
        Schema::create('credit_notes', function (Blueprint $table) {
            $table->id();
            $table->string('credit_note_number', 30)->unique();
            $table->foreignId('rma_id')->nullable()->constrained('rmas');
            $table->foreignId('customer_id')->constrained('customers');
            $table->date('issue_date');
            $table->decimal('total_amount', 10, 2);
            $table->enum('status', ['Draft', 'Issued', 'Applied', 'Cancelled'])->default('Draft');
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('credit_notes');
    }
}