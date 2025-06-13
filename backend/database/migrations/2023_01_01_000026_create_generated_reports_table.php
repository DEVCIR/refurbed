<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGeneratedReportsTable extends Migration
{
    public function up()
    {
        Schema::create('generated_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('template_id')->nullable()->constrained('report_templates');
            $table->string('report_name', 100);
            $table->foreignId('generated_by')->constrained('users');
            $table->timestamp('generation_date')->useCurrent();
            $table->text('parameters')->nullable();
            $table->string('file_path', 255)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('generated_reports');
    }
}