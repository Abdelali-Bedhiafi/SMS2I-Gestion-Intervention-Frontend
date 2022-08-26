import { Injectable } from '@angular/core';
import {BackendService} from "./backend.service";
import {Observable} from "rxjs";
import {AgentAdministratif} from "../model/agent-administratif";

@Injectable({
  providedIn: 'root'
})
export class AgentAdministratifService {

  constructor(private backend: BackendService) { }

  getAll():Observable<AgentAdministratif[]>{
    return this.backend.sendGetRequest<AgentAdministratif[]>("agentAdministratif");
  }

  add(agent: AgentAdministratif & { password: string } ):Observable<AgentAdministratif>{
    return this.backend.sendPostRequest<AgentAdministratif>("agentAdministratif",agent);
  }

  update(agent: AgentAdministratif): Observable<AgentAdministratif> {
    return this.backend.sendPutRequest<AgentAdministratif>("agentAdministratif/"+agent.id,agent);
  }
}
