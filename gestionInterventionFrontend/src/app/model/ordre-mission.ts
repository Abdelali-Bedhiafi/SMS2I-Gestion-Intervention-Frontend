import { Client } from "./client";
import { Technicien } from "./technicien";
import {SousCategorie} from "./sous-categorie";
import { Superviseur } from "./superviseur";
import {EtatOrdreMission} from "./etat-ordre-mission";

export interface OrdreMission {
  id: number;
  client: Client;
  etat: EtatOrdreMission;
  dateDebutEstimee: Date;
  techniciens: Technicien[];
  sousCategories: SousCategorie[];
  superviseur:Superviseur;
  designation	:string;
}
