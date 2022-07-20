import {Time} from "@angular/common";

export interface Deplacement {
  id: number;
  date: Date;
  heureDebut:	Time;
  heureFin: Time;
  mission: number;
}
