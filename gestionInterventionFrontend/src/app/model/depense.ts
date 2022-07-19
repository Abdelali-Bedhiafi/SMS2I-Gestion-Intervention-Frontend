import { CategorieDepense } from "./categorie-depense";

export interface Depense {
  id: string;
  valeur: number;
  valeurRemboursee: number;
  categorieDepences:CategorieDepense;
}
