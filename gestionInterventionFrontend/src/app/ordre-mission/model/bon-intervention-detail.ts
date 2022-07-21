import { OrdreMission } from "src/app/model/ordre-mission";
import { SousCategorie } from "src/app/model/sous-categorie";

export interface BonInterventionDetail {
  id: number;
observationTechnicien	: string
archiveUrl	: string
dureeTotale	: number
mission: OrdreMission
categories:SousCategorie[]







}
