import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Depense } from '../model/depense';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {



  constructor(private backend: BackendService) { }

  getAll():Observable<Depense[]>{
    return this.backend.sendGetRequest<Depense[]>("DepencesDeplacement");
  }

  getAllByDeplacement(id:number):Observable<Depense[]>{
    return this.backend.sendGetRequest<Depense[]>("DepencesDeplacement/search/deplacement/"+id);
  }

  update(depense: {id: string, valeur: number, valeurRemboursee: number}):Observable<Depense>{
      return this.backend.sendPutRequest<Depense>("DepencesDeplacement/"+depense.id,{valeur: depense.valeur,valeurRemboursee: depense.valeurRemboursee});
  }

  add(depense: Depense,deplacementId:number,):Observable<Depense>{
    const body={
      valeur: depense.valeur,
      valeurRemboursee: depense.valeurRemboursee,
      deplacement:{
        id: deplacementId
      },
      categorieDepences: {
        id: depense.categorieDepences.id
      }
    };
    return this.backend.sendPostRequest<Depense>("DepencesDeplacement",body);
  }

  delete(id:string):Observable<void>{
    return this.backend.sendDeleteRequest<void>("DepencesDeplacement/"+id);
  }
}
