<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Scopes\PartnershipScope;


class Transaction extends Model
{
    use HasFactory;

    /**
     * Define quais campos podem ser preenchidos em massa (mass assignment).
     * Isso protege o sistema contra preenchimento indevido de campos sensíveis.
     */
    protected $fillable = [
        'partnership_id',
        'owner_user_id',
        'is_shared',
        'type',
        'amount',
        'description',
        'transaction_date',
    ];

    /**
     * Casts automáticos de atributos.
     * Garante que os dados venham no formato correto.
     */
    protected $casts = [
        'is_shared'        => 'boolean',
        'amount'           => 'decimal:2',
        'transaction_date' => 'date',
    ];

    /**
     * Relacionamento com a parceria financeira.
     * Cada transação pertence a uma partnership.
     */
    public function partnership()
    {
        return $this->belongsTo(Partnership::class);
    }

    /**
     * Relacionamento com o usuário dono da transação.
     * Importante para controle de privacidade.
     */
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_user_id');
    }

    protected static function booted()
    {
        /**
         * Registramos o Global Scope.
         * A partir daqui, TODA query de Transaction
         * será automaticamente filtrada por partnership.
         */
        static::addGlobalScope(new PartnershipScope);
    }

}
