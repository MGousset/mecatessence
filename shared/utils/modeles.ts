export const TRANSMISSIONS = ['traction', 'propulsion'] as const
export type Transmission = typeof TRANSMISSIONS[number]

export const LIBELLES_TRANSMISSION: Record<Transmission, string> = {
  traction: 'Traction',
  propulsion: 'Propulsion'
}

export interface Motorisation {
  id: string
  libelle: string
}

export interface Modele {
  id: string
  marque: string
  nom: string
  /** Modèles techniquement identiques (clones) : même plateforme, mêmes missions */
  plateforme: string
  anneeMin: number
  anneeMax: number
  motorisations: readonly Motorisation[]
}

export interface ChoixVehicule {
  modeleId: string
  annee: number
  motorisation: string
  transmission: Transmission
}

// À vérifier sur la RTA : codes moteur proposés et bornes exactes de la phase 2
const MOTORISATIONS_MASTER2: readonly Motorisation[] = [
  { id: 'g9u', libelle: '2.5 diesel (moteur G9U)' },
  { id: 'f9q', libelle: '1.9 diesel (moteur F9Q)' },
  { id: 'zd3', libelle: '3.0 diesel (moteur ZD3)' },
  { id: 'inconnue', libelle: 'Je ne sais pas' }
]

const PLATEFORME_MASTER2 = {
  plateforme: 'master2',
  anneeMin: 2003,
  anneeMax: 2010,
  motorisations: MOTORISATIONS_MASTER2
}

export const MODELES: readonly Modele[] = [
  { id: 'renault-master-2-ph2', marque: 'Renault', nom: 'Master II phase 2', ...PLATEFORME_MASTER2 },
  { id: 'opel-movano-a-ph2', marque: 'Opel', nom: 'Movano A phase 2', ...PLATEFORME_MASTER2 },
  { id: 'vauxhall-movano-a-ph2', marque: 'Vauxhall', nom: 'Movano A phase 2', ...PLATEFORME_MASTER2 },
  { id: 'nissan-interstar-ph2', marque: 'Nissan', nom: 'Interstar phase 2', ...PLATEFORME_MASTER2 }
]

export function trouverModele(id: string) {
  return MODELES.find(m => m.id === id)
}

export function libelleModele(id: string) {
  const m = trouverModele(id)
  return m ? `${m.marque} ${m.nom}` : 'Modèle inconnu'
}

export function libelleMotorisation(modeleId: string, motorisationId: string) {
  return trouverModele(modeleId)?.motorisations.find(m => m.id === motorisationId)?.libelle ?? motorisationId
}

export function anneesDuModele(modele: Modele) {
  return Array.from({ length: modele.anneeMax - modele.anneeMin + 1 }, (_, i) => modele.anneeMin + i)
}

export function modelesDeLaPlateforme(plateforme: string) {
  return MODELES.filter(m => m.plateforme === plateforme)
}

export function erreurChoix(choix: ChoixVehicule): { champ: keyof ChoixVehicule, message: string } | null {
  const modele = trouverModele(choix.modeleId)
  if (!modele) return { champ: 'modeleId', message: 'Modèle non pris en charge' }
  if (choix.annee < modele.anneeMin || choix.annee > modele.anneeMax) {
    return { champ: 'annee', message: `Année entre ${modele.anneeMin} et ${modele.anneeMax}` }
  }
  if (!modele.motorisations.some(m => m.id === choix.motorisation)) {
    return { champ: 'motorisation', message: 'Motorisation inconnue pour ce modèle' }
  }
  return null
}

export function choixValide(choix: ChoixVehicule) {
  return erreurChoix(choix) === null
}
