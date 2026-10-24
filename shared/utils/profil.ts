import { z } from 'zod'

export const CGU_VERSION = '2026-10'

export function estProfilComplet(u?: { pseudo?: string | null, cguVersion?: string | null } | null) {
  return !!u?.pseudo && u.cguVersion === CGU_VERSION
}

export const schemaEmail = z.object({
  email: z.email('Adresse e-mail invalide')
})

export const schemaProfil = z.object({
  pseudo: z
    .string()
    .trim()
    .min(3, '3 caractères minimum')
    .max(24, '24 caractères maximum')
    .regex(/^[\p{L}\p{N}_-]+$/u, 'Lettres, chiffres, « - » et « _ » uniquement'),
  // boolean + refine (et pas literal(true)) pour rester compatible avec v-model
  cgu: z.boolean().refine(v => v, 'Tu dois accepter les conditions d’utilisation')
})
