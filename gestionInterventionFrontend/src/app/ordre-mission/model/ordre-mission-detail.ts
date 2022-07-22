import { Client } from "../../model/client";
import { Technicien } from "../../model/technicien";
import {Superviseur} from "../../model/superviseur";
import {CheckList} from "../../model/check-list";
import {SousCategorie} from "../../model/sous-categorie";
import {Deplacement} from "./deplacement";
import {EtatOrdreMission} from "../../model/etat-ordre-mission";

export interface OrdreMissionDetail {
  id: number;
  etat: EtatOrdreMission;
  descriptionMission: string;
  dateMission: Date;
  dateDebutEstimee: Date;
  dureeEstimee: number;
  retourClient: string ;
  accompteMission: number;
  retourAccompte: number;
  techniciens: Technicien[] ;
  client: Client;
  superviseur: Superviseur;
  checklist: CheckList;
  sousCategories: SousCategorie[];
  deplacements: Deplacement[];
  designation	:string;
}

