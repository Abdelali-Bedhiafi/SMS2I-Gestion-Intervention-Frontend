import {Software} from "./software";

export interface SoftwareCategorie {
  id: number;
  nom: string;
  softwares: Software[];
}
