import {SousCategorie} from "../../model/sous-categorie";
import {FormControl} from "@angular/forms";

export interface ObjetMission {
  actions: FormControl<SousCategorie[]|null>;
  reseaux: FormControl<SousCategorie[]|null>;
  technologies: FormControl<SousCategorie[]|null>;
}
