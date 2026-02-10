<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Partnership extends Model
{
    use HasFactory;

    /**
     * Campos que podem ser preenchidos em massa.
     */
    protected $fillable = [
        'type', // individual | couple
    ];

    /**
     * Relacionamento: uma partnership possui vários usuários.
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }

    /**
     * Relacionamento: uma partnership possui várias transações.
     */
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * Relacionamento: convites associados à partnership.
     */
    public function invitations()
    {
        return $this->hasMany(PartnershipInvitation::class);
    }
}
