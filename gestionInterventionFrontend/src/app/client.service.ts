import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from './backend.service';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients: Map<number,Client>;

  constructor(private backend: BackendService) {
    this.clients = new Map<number,Client>();
    this.backend.sendGetRequest<Client[]>("client").subscribe(list=>{
      console.log(list);
      list.forEach(client=>{
        this.clients.set(client.id,client);
      });
    })
  }

}
