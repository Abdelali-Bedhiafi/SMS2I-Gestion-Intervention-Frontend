import { Client } from "./client";
import { Technicien } from "./technicien";
import {SousCategorie} from "./sous-categorie";
import { Superviseur } from "./superviseur";

export interface OrdreMission {
  id: number;
  client: Client;
  etat: string;
  dateDebutEstimee: Date;
  techniciens: Technicien[];
  sousCategories: SousCategorie[];
  superviseur:Superviseur;
}
