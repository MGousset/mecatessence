import { trouverModele, type Transmission } from './modeles'
// import M01 from '../missions/M01.json'
// import M02 from '../missions/M02.json'
// import M04G from '../missions/M04G.json'
// import M04D from '../missions/M04D.json'
// import M05G from '../missions/M05G.json'
// import M05D from '../missions/M05D.json'

export type NiveauMission = 0 | 1 | 2

export interface PasseMission {
  titre: string
  consigne: string
}

export interface Mission {
  code: string
  titre: string
  resume: string
  niveau: NiveauMission
  dureeMinutes: number
  plateformes: string[]
  transmissions: Transmission[]
  mire: boolean
  materiel: string[]
  securite: string[]
  passes: PasseMission[]
}

// Les JSON sont validés en CI par schemas/mission.schema.json
export const MISSIONS: Mission[] = []; // [M01, M02, M04G, M04D, M05G, M05D];

const PAR_CODE = new Map(MISSIONS.map(m => [m.code, m]))

export function trouverMission(code: string) {
  return PAR_CODE.get(code)
}

export function missionApplicable(mission: Mission, modeleId: string, transmission: Transmission) {
  const modele = trouverModele(modeleId)
  return !!modele
    && mission.plateformes.includes(modele.plateforme)
    && mission.transmissions.includes(transmission)
}

export function missionsPour(modeleId: string, transmission: Transmission) {
  return MISSIONS.filter(m => missionApplicable(m, modeleId, transmission))
}
