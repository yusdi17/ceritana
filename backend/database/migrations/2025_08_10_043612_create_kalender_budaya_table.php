<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kalender_budaya', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provinsi_id')->constrained('provinsi')->onDelete('restrict');
            $table->string('nama_event', 200);
            $table->text('deskripsi')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->string('recurring_rule', 255)->nullable();
            $table->text('lokasi')->nullable();
            $table->string('sumber_url', 2048)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kalender_budaya');
    }
};
