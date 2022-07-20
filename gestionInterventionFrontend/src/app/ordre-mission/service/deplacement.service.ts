import { Injectable } from '@angular/core';
import {BackendService} from "../../service/backend.service";
import {Observable} from "rxjs";
import {Deplacement} from "../model/deplacement";

@Injectable({
  providedIn: 'root'
})
export class DeplacementService {

  constructor(private backend: BackendService) { }

  format(deplacement: Deplacement,missionId?: number):any{
    if(missionId) return {
      date: deplacement.date,
      heureDebut: deplacement.heureDebut,
      heureFin: deplacement.heureFin,
      mission: {
        id: missionId
      }
    };
    return {
      id: deplacement.id,
      date: deplacement.date,
      heureDebut: deplacement.heureDebut,
      heureFin: deplacement.heureFin
    };
  }

  create(deplacement: Deplacement, missionId: number):Observable<Deplacement>{

    return this.backend.sendPostRequest<Deplacement>("Deplacement",this.format(deplacement,missionId));
  }

  update(deplacement: Deplacement):Observable<Deplacement>{
    return this.backend.sendPutRequest("Deplacement/"+deplacement.id,this.format(deplacement));
  }
}
