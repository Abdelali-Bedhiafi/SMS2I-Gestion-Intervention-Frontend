import { Client } from "./client";
import { Technicien } from "./technicien";

export interface OrdreMission {
  id: number;
  client: Client;
  status: string;
  dateMission: Date;
  dateDebutEstimee: Date;
  techniciens: Technicien[];
}
