import { Client } from "../client";
import { Technicien } from "../technicien";

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

