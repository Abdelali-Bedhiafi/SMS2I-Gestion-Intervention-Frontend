import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Superviseur } from './superviseur';

@Injectable({
  providedIn: 'root'
})
export class SuperviseurService {
  superviseurs: Map<number,Superviseur>
  constructor(private backend: BackendService ) {
    this.superviseurs=new Map<number,Superviseur>();
    this.backend.sendGetRequest<Superviseur[]>("superviseur").subscribe(list=>{
      list.forEach(superviseur=>{
        this.superviseurs.set(superviseur.id,superviseur);
      })
    });
   }
}
