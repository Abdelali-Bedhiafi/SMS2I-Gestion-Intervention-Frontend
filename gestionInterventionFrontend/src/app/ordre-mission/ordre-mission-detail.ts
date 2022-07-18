import { Client } from "../model/client";
import { Technicien } from "../model/technicien";

export interface OrdreMissionDetail {
  id: number;
  descriptionMission: string;
  dateMission: Date;
  dateDebutEstime: Date;
  dureeEstime: number;
  retourClient: string ;
  accompteMission: number;
  retourAccompte: number;
  techniciens: Technicien[] ;
  client: Client;
}

