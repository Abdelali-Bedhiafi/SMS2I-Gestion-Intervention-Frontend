import { Client } from "./client";

export interface OrderMission {
  numero: number;
  client: Client;
  status: string;
  date: Date;
  dateDebutEstimee: Date;
}
