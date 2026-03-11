// ============================================================
// utils/codigo.ts — Gerador de Código de Convite
// ============================================================

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Gera um código de convite único no formato "PAR-XXXX"
 * Ex: PAR-3X7K, PAR-9AB2
 */
export async function gerarCodigoConvite(): Promise<string> {
  const caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // sem caracteres ambíguos (0, O, 1, I)
  let tentativas = 0

  while (tentativas < 10) {
    let codigo = 'PAR-'
    for (let i = 0; i < 4; i++) {
      codigo += caracteres[Math.floor(Math.random() * caracteres.length)]
    }

    // Verifica se o código já existe
    const existente = await prisma.casal.findUnique({
      where: { codigoConvite: codigo },
    })

    if (!existente) return codigo
    tentativas++
  }

  throw new Error('Não foi possível gerar um código único. Tente novamente.')
}

/**
 * Formata valor monetário para exibição em pt-BR
 */
export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

/**
 * Formata data para exibição em pt-BR
 */
export function formatarData(data: Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(data)
}
