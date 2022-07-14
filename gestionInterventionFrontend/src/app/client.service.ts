import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from './backend.service';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private backend: BackendService) { }

  getAll():Observable<Client[]>{
    return this.backend.sendGetRequest("client");
  }
}
