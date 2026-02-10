<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PartnershipInvitation extends Model
{
    /**
     * Campos que podem ser preenchidos em massa.
     * Devem ser exatamente os mesmos que você criou na Migration.
     */
    protected $fillable = [
        'partnership_id',
        'code',
        'expires_at',
        'used_at',
    ];
}
