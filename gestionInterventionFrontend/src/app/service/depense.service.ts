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
  update(depense: {id: string, valeur: number, valeurRemboursee: number}):void{
      this.backend.sendPutRequest<Depense>("DepencesDeplacement/"+depense.id,{valeur: depense.valeur,valeurRembourse: depense.valeurRemboursee});
  }
}
