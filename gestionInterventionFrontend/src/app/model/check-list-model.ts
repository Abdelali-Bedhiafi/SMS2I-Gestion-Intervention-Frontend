import {Materiel} from "./materiel";
import {Software} from "./software";
import {SoftwareCategorie} from "./software-categorie";

export interface CheckListModel {
  id: number;
  nom: string;
  materiels: Materiel[];
  softwares: Software[];
  softwareCategories: SoftwareCategorie[];
}
