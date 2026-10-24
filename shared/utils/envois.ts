import { z } from 'zod'

export const TYPES_VIDEO = ['video/mp4', 'video/quicktime'] as const
export type TypeVideo = typeof TYPES_VIDEO[number]

export const EXTENSIONS_VIDEO: Record<TypeVideo, string> = {
  'video/mp4': 'mp4',
  'video/quicktime': 'mov'
}

export const TAILLE_MAX_VIDEO = 4 * 1024 ** 3 // 4 Gio
export const TAILLE_MORCEAU = 10 * 1024 ** 2 // 10 Mio par partie
export const SEUIL_ENVOI_SIMPLE = 100 * 1024 ** 2 // au-delà, multipart obligatoire
export const QUOTA_ENVOIS_JOUR = 12

/** Type MIME fiable, même si le navigateur n’en fournit pas (certains .mov) */
export function typeVideoDe(fichier: { name: string, type: string }): TypeVideo | null {
  const connu = TYPES_VIDEO.find(t => t === fichier.type)
  if (connu) return connu
  const nom = fichier.name.toLowerCase()
  if (nom.endsWith('.mp4')) return 'video/mp4'
  if (nom.endsWith('.mov')) return 'video/quicktime'
  return null
}

export const schemaDemarrer = z.object({
  vehiculeId: z.string().min(1).max(64),
  missionCode: z.string().min(1).max(16),
  typeMime: z.enum(TYPES_VIDEO),
  taille: z.number().int().positive().max(TAILLE_MAX_VIDEO)
})

/** Ce qu’envoie signRequest d’@uppy/aws-s3 v6 */
export const schemaSigner = z.object({
  method: z.enum(['PUT', 'POST', 'GET', 'DELETE']),
  key: z.string().min(1).max(300),
  uploadId: z.string().min(1).max(1024).nullish().transform(v => v ?? undefined),
  partNumber: z.number().int().min(1).max(10_000).nullish().transform(v => v ?? undefined)
})

export const schemaIdContribution = z.object({
  contributionId: z.string().min(1).max(64)
})
