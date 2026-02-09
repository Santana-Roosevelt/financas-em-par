<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Cria a tabela partnerships.
     * Cada partnership representa um "contexto financeiro".
     * Tudo no sistema sempre estará ligado a uma partnership.
     */ 
    
    public function up(): void
    {
        Schema::create('partnerships', function (Blueprint $table) {
        $table->id();
        $table->enum('type', ['individual', 'couple']);
        $table->timestamps();
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partnerships');
    }
};
