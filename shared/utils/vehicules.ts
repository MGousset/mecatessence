import { z } from 'zod'
import { erreurChoix, TRANSMISSIONS } from './modeles'

export const VIN_DEBUT_LONGUEUR = 9

/** Majuscules, sans espaces, tronqué à 9 caractères (constructeur + type) */
export function nettoyerVin(valeur: string) {
  return valeur.toUpperCase().replace(/\s+/g, '').slice(0, VIN_DEBUT_LONGUEUR)
}

export const champsVehicule = z.object({
  surnom: z.string().trim().min(1, 'Donne-lui un petit nom').max(40, '40 caractères maximum'),
  modeleId: z.string({ error: 'Choisis un modèle' }).min(1, 'Choisis un modèle'),
  annee: z.number({ error: 'Choisis une année' }).int(),
  transmission: z.enum(TRANSMISSIONS, { error: 'Choisis une transmission' }),
  motorisation: z.string({ error: 'Choisis une motorisation' }).min(1, 'Choisis une motorisation'),
  vinDebut: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-HJ-NPR-Z0-9]{0,9}$/, '9 caractères maximum, chiffres et lettres sauf I, O et Q')
    .optional()
})

export const schemaVehicule = champsVehicule.superRefine((v, ctx) => {
  const erreur = erreurChoix(v)
  if (erreur) ctx.addIssue({ code: 'custom', path: [erreur.champ], message: erreur.message })
})

/** Après création, seuls le surnom et le début du VIN sont modifiables */
export const schemaVehiculeMaj = champsVehicule.pick({ surnom: true, vinDebut: true }).partial()
