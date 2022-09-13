import {Client} from "../../model/client";
import {Superviseur} from "../../model/superviseur";

export interface OrdreMissionCreation {
  descriptionMission: string;
  dateMission: Date;
  client: Client;
  superviseur: Superviseur;
  agentAdministratif: {id:number};
}
