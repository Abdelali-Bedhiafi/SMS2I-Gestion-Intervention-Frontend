import { Injectable } from '@angular/core';
import {BackendService} from "../../service/backend.service";
import {Observable} from "rxjs";
import {Deplacement} from "../model/deplacement";

@Injectable({
  providedIn: 'root'
})
export class DeplacementService {

  constructor(private backend: BackendService) { }

  create(deplacement: Deplacement):Observable<Deplacement>{
    const body = {
      date: deplacement.date,
      heureDebut: deplacement.heureDebut,
      heureFin: deplacement.heureFin,
      mission: {
        id: deplacement.mission
      }
    }
    return this.backend.sendPostRequest<Deplacement>("Deplacement",body);
  }
}
