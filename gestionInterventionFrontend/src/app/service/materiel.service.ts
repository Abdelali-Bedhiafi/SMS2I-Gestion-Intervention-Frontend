import { Injectable } from '@angular/core';
import {BackendService} from "./backend.service";
import {Materiel} from "../model/materiel";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MaterielService {

  constructor(private backend: BackendService) { }

  getAll():Observable<Materiel[]>{
    return this.backend.sendGetRequest<Materiel[]>("materiel");
  }

  add(materiel: Materiel):Observable<Materiel> {
    return this.backend.sendPostRequest<Materiel>("materiel",materiel);
  }


  update(materiel: Materiel):Observable<Materiel> {
    return this.backend.sendPutRequest<Materiel>("materiel/"+materiel.id,materiel);
  }

  delete(materiel: Materiel):Observable<void> {
    return this.backend.sendDeleteRequest<void>("materiel/"+materiel.id);
  }
}
