<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

class PartnershipScope implements Scope
{
    /**
     * Este método é executado automaticamente
     * em TODA query Eloquent do model que usar esse scope.
     */
    public function apply(Builder $builder, Model $model)
    {
        /**
         * Evitamos aplicar o scope:
         * - no console (artisan)
         * - em seeders
         * - quando não há usuário logado
         */
        if (!Auth::check()) {
            return;
        }

        /**
         * Aqui está o coração da segurança:
         * O Laravel injeta automaticamente:
         *
         * WHERE partnership_id = usuário_logado.partnership_id
         */
        $builder->where(
            $model->getTable() . '.partnership_id',
            Auth::user()->partnership_id
        );
    }
}
