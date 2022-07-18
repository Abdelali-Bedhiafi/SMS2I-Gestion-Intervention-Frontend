import {Material} from "./material";
import {Software} from "./software";
import {SoftwareCategorie} from "./software-categorie";

export interface CheckListModel {
  id: number;
  nom: string;
  materiels: Material[];
  softwares: Software[];
  softwareCategories: SoftwareCategorie[];
}
