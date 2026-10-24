export const STATUTS_CONTRIBUTION = [
  'envoi',
  'recue',
  'controle',
  'refusee_auto',
  'a_moderer',
  'refusee',
  'validee',
  'publiee'
] as const
export type StatutContribution = typeof STATUTS_CONTRIBUTION[number]

/** Transitions autorisées (n8n et modération) */
export const TRANSITIONS: Record<StatutContribution, readonly StatutContribution[]> = {
  envoi: ['recue', 'refusee_auto'],
  recue: ['controle', 'refusee_auto'],
  controle: ['refusee_auto', 'a_moderer'],
  refusee_auto: [],
  a_moderer: ['validee', 'refusee'],
  refusee: [],
  validee: ['publiee'],
  publiee: []
}

export function transitionPermise(de: StatutContribution, vers: StatutContribution) {
  return TRANSITIONS[de].includes(vers)
}

export function estRefus(statut: StatutContribution) {
  return statut === 'refusee' || statut === 'refusee_auto'
}

type CouleurBadge = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'

export const BADGES = {
  a_faire: { label: 'À faire', color: 'neutral', icon: 'i-lucide-circle-dashed' },
  envoi_interrompu: { label: 'Envoi interrompu', color: 'warning', icon: 'i-lucide-circle-pause' },
  en_controle: { label: 'En contrôle', color: 'info', icon: 'i-lucide-hourglass' },
  a_refaire: { label: 'À refaire', color: 'error', icon: 'i-lucide-rotate-ccw' },
  validee: { label: 'Validée', color: 'success', icon: 'i-lucide-circle-check' },
  publiee: { label: 'Publiée', color: 'primary', icon: 'i-lucide-globe' }
} as const satisfies Record<string, { label: string, color: CouleurBadge, icon: string }>

export type BadgeMission = keyof typeof BADGES

const BADGE_DU_STATUT: Record<StatutContribution, BadgeMission> = {
  envoi: 'envoi_interrompu',
  recue: 'en_controle',
  controle: 'en_controle',
  a_moderer: 'en_controle',
  refusee_auto: 'a_refaire',
  refusee: 'a_refaire',
  validee: 'validee',
  publiee: 'publiee'
}

// Du moins avancé au plus avancé : on affiche le plus avancé
const ORDRE_BADGES: readonly BadgeMission[] = [
  'a_faire',
  'a_refaire',
  'envoi_interrompu',
  'en_controle',
  'validee',
  'publiee'
]

export function badgeMission(statuts: readonly StatutContribution[]): BadgeMission {
  return statuts.reduce<BadgeMission>((meilleur, statut) => {
    const badge = BADGE_DU_STATUT[statut]
    return ORDRE_BADGES.indexOf(badge) > ORDRE_BADGES.indexOf(meilleur) ? badge : meilleur
  }, 'a_faire')
}

export function envoiPermis(badge: BadgeMission) {
  return badge === 'a_faire' || badge === 'a_refaire' || badge === 'envoi_interrompu'
}

export function missionReussie(badge: BadgeMission) {
  return badge === 'validee' || badge === 'publiee'
}
