<?php

namespace App\Services;

use App\Models\User;
use App\Models\Partnership;
use App\Models\PartnershipInvitation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class RegisterUserService
{
        /**
     * Responsável por registrar um novo usuário no sistema.
     * Decide se o cadastro é:
     * - Individual
     * - Casal (criando parceria)
     * - Casal (entrando por convite)
     */

    public function register(array $data): User
    {
        return DB::transaction(function () use ($data) {
            // Se tiver código, entra em parceria existente
            if (!empty($data['invitation_code'])) {
                return $this->registerWithInvitation($data);
            }

            // Se não, cria uma nova parceria (individual ou casal)
            return $this->registerNewPartnership($data);
        });
    }

    private function registerWithInvitation(array $data): User
    {
        // Busca convite válido
        $invitation = PartnershipInvitation::where('code', $data['invitation_code'])
            ->whereNull('used_at')
            ->where('expires_at', '>', now())
            ->first();

        // Se não existir ou estiver inválido
        if (!$invitation) {
            throw ValidationException::withMessages([
                'invitation_code' => 'Código de convite inválido ou expirado.'
            ]);
        }

        // Cria o usuário já vinculado à partnership existente
        $user = User::create([
            'name'           => $data['name'],
            'email'          => $data['email'],
            'password'       => Hash::make($data['password']),
            'partnership_id' => $invitation->partnership_id,
        ]);

        // Marca o convite como usado
        $invitation->update(['used_at' => now()]);

        return $user;
    }

    /**
     * Cadastro criando uma nova partnership.
     * Pode ser individual ou casal.
     */
    private function registerNewPartnership(array $data): User
    {
        // Cria a partnership conforme o tipo escolhido
        $partnership = Partnership::create([
            'type' => $data['account_type'], 
        ]);

        // Cria o usuário vinculado à partnership recém-criada
        return User::create([
            'name'           => $data['name'],
            'email'          => $data['email'],
            'password'       => Hash::make($data['password']),
            'partnership_id' => $partnership->id,
        ]);
    }
}