<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Adiciona o vínculo entre usuário e partnership.
     */
    
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('partnership_id')
                  ->after('id')
                  ->constrained()
                  ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['partnership_id']);
            $table->dropColumn('partnership_id');
        });
    }
};
