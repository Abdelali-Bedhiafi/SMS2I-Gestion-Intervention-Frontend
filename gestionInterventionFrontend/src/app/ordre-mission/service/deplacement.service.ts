import { Injectable } from '@angular/core';
import {BackendService} from "../../service/backend.service";
import {Observable} from "rxjs";
import {Deplacement} from "../model/deplacement";

@Injectable({
  providedIn: 'root'
})
export class DeplacementService {

  constructor(private backend: BackendService) { }

  format(deplacement: Deplacement,missionId: number):any{
    return {
      id: deplacement.id,
      date: deplacement.date,
      heureDebut: deplacement.heureDebut,
      heureFin: deplacement.heureFin,
      mission: {
        id: missionId
      }
    }
  }

  create(deplacement: Deplacement, missionId: number):Observable<Deplacement>{
    return this.backend.sendPostRequest<Deplacement>("Deplacement",this.format(deplacement,missionId));
  }

  update(deplacement: Deplacement, missionId: number ):Observable<Deplacement>{
    return this.backend.sendPutRequest<Deplacement>("Deplacement/"+deplacement.id,this.format(deplacement,missionId));
  }
}
