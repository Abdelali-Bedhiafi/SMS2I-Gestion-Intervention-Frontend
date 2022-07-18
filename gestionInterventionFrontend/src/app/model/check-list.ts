import {Material} from "./material";
import {Software} from "./software";

export interface CheckList {
  id: number;
  materiels: Material[];
  softwares: Software[];
  model:{
    id: number;
    softwareCategories: { id: number;nom: string; }[];
    softwares: {id:number}[];
  }
}
