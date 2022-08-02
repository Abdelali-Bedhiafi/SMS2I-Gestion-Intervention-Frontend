import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Client } from '../model/client';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private backend: BackendService) { }
  getAll():Observable<Client[]>{
    return this.backend.sendGetRequest<Client[]>("client");
  }

  add(client: Client): Observable<Client> {
    return this.backend.sendPostRequest<Client>("client",client);
  }

  update(client: Client):Observable<Client> {
    return this.backend.sendPutRequest<Client>("client/"+client.id,client);
  }
}
