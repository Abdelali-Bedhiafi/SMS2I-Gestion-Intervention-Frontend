import { Client } from "./client";
import { Technicien } from "./technicien";
import {SousCategorie} from "./sous-categorie";

export interface OrdreMission {
  id: number;
  client: Client;
  etat: string;
  dateDebutEstimee: Date;
  techniciens: Technicien[];
  sousCategories: SousCategorie[];
}
