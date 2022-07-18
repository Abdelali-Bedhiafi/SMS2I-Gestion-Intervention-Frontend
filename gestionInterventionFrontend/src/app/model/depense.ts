export interface Depense {
  id: string;
  valeur: number;
  valeurRemboursee: number;
  categorieDepences:{label: string;
                    plafond: number;};
}
