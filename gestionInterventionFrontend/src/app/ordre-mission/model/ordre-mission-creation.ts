import {Client} from "../../model/client";
import {Superviseur} from "../../model/superviseur";
import {FormControl} from "@angular/forms";

export interface OrdreMissionCreation {
  descriptionMission: string;
  dateMission: Date;
  client: Client;
  superviseur: Superviseur;
}
