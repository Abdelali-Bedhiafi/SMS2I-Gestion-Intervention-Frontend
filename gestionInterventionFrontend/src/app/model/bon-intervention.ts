import {OrdreMission} from "./ordre-mission";

export interface BonIntervention {
  id: number;
  mission: OrdreMission;
  tags: { id: number, valeur: string}[];
}
