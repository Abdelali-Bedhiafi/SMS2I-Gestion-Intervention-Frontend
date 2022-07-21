import { Client } from "../../model/client";
import { Technicien } from "../../model/technicien";
import {Superviseur} from "../../model/superviseur";
import {CheckList} from "../../model/check-list";
import {SousCategorie} from "../../model/sous-categorie";
import {Deplacement} from "./deplacement";

export interface OrdreMissionDetail {
  id: number;
  etat: string;
  descriptionMission: string;
  dateMission: Date;
  dateDebutEstime: Date;
  dureeEstime: number;
  retourClient: string ;
  accompteMission: number;
  retourAccompte: number;
  techniciens: Technicien[] ;
  client: Client;
  superviseur: Superviseur;
  checkList: CheckList;
  sousCategories: SousCategorie[];
  deplacements: Deplacement[];
  designation	:string;
}

