import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Superviseur } from '../model/superviseur';

@Injectable({
  providedIn: 'root'
})
export class SuperviseurService {

  superviseurs: Map<number,Superviseur>;
  ready: Promise< boolean>;

  constructor(private backend: BackendService ) {
    this.superviseurs = new Map<number,Superviseur>();
    this.ready = new Promise<boolean>((resolve) =>{
      this.backend.sendGetRequest<Superviseur[]>("superviseur")
        .subscribe(list=>{
          list.forEach(superviseur => this.superviseurs.set(superviseur.id,superviseur));
          resolve(true);
        });
    });
   }
}
