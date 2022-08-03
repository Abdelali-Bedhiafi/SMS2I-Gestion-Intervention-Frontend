import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Superviseur } from '../model/superviseur';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SuperviseurService {


  constructor(private backend: BackendService ) { }

   getAll():Observable<Superviseur[]>{
    return this.backend.sendGetRequest<Superviseur[]>("superviseur");
   }

   add(superviseur: Superviseur):Observable<Superviseur>{
    return this.backend.sendPostRequest<Superviseur>("superviseur",superviseur);
   }

  update(superviseur: Superviseur): Observable<Superviseur> {
    return this.backend.sendPutRequest<Superviseur>("superviseur/"+superviseur.id,superviseur);
  }
}
