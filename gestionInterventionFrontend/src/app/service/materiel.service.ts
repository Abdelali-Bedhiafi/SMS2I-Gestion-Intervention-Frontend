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
}
