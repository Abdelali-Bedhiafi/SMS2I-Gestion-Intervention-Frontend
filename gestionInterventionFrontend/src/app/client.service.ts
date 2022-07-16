import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients: Map<number,Client>;
  ready : Promise<boolean>;
  constructor(private backend: BackendService) {
    this.clients = new Map<number,Client>();
    this.ready = new Promise<boolean>((resolve)=>{
      this.backend.sendGetRequest<Client[]>("client")
        .subscribe(list=>{
          list.forEach(client => this.clients.set(client.id,client));
          resolve(true);
        });
    });

  }

}
