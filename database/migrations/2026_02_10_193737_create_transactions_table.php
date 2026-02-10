<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    /**
     * Cria a tabela de transações financeiras.
     * Essa tabela armazena TODAS as entradas e saídas do sistema.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {

            // Identificador único da transação
            $table->id();

            /**
             * partnership_id
             * Indica a qual parceria financeira essa transação pertence.
             * É a principal chave de isolamento de dados do sistema.
             */
            $table->foreignId('partnership_id')
                  ->constrained()
                  ->cascadeOnDelete();

            /**
             * owner_user_id
             * Usuário que criou a transação.
             * Essencial para controle de privacidade.
             */
            $table->foreignId('owner_user_id')
                  ->constrained('users')
                  ->cascadeOnDelete();

            /**
             * is_shared
             * Define se a transação é:
             * - false → privada (só o dono vê)
             * - true  → compartilhada (ambos do casal veem)
             */
            $table->boolean('is_shared')->default(false);

            /**
             * type
             * Define se a transação é uma entrada ou saída.
             */
            $table->enum('type', ['income', 'expense']);

            /**
             * amount
             * Valor financeiro da transação.
             * DECIMAL evita erros de arredondamento (nunca usar float).
             */
            $table->decimal('amount', 15, 2);

            /**
             * description
             * Descrição livre da transação.
             * Ex: "Aluguel", "Mercado", "Salário"
             */
            $table->string('description');

            /**
             * transaction_date
             * Data real em que a transação ocorreu.
             * Importante para extratos e relatórios.
             */
            $table->date('transaction_date');

            // Controle padrão de criação e atualização
            $table->timestamps();
        });
    }

    /**
     * Remove a tabela de transações em caso de rollback.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
