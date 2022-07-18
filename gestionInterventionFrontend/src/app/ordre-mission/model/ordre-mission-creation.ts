import {Client} from "../../model/client";
import {Superviseur} from "../../model/superviseur";
import {FormControl} from "@angular/forms";

export interface OrdreMissionCreation {
  descriptionMission: FormControl<string|null>;
  dateMission: FormControl<Date|null>;
  client: FormControl<Client|null>;
  superviseur: FormControl<Superviseur|null>;
}
