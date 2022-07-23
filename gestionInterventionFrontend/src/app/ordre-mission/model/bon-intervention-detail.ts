import { GroupTags } from "src/app/model/group-tags";
import { OrdreMission } from "src/app/model/ordre-mission";
import { SousCategorie } from "src/app/model/sous-categorie";
import { Tags } from "src/app/model/tags";

export interface BonInterventionDetail {
  id: number;
observationTechnicien	: string
archiveUrl	: string
dureeTotale	: number
mission: OrdreMission
categories:SousCategorie[]
tags:Tags[]







}
