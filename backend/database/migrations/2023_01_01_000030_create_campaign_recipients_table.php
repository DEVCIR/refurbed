<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCampaignRecipientsTable extends Migration
{
    public function up()
    {
        Schema::create('campaign_recipients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')->constrained('email_campaigns');
            $table->foreignId('subscriber_id')->nullable()->constrained('subscribers');
            $table->string('email_address', 100);
            $table->enum('status', ['Pending', 'Sent', 'Failed', 'Opened', 'Clicked'])->default('Pending');
            $table->timestamp('sent_time')->nullable();
            $table->timestamp('open_time')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('campaign_recipients');
    }
}