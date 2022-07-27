import {Categorie} from "./categorie";

export interface SousCategorie {
  id: number;
  titre: string;
  description: string;
  categorie: Categorie;
}
