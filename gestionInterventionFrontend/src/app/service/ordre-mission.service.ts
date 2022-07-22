import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { OrdreMission } from '../model/ordre-mission';
import { Observable } from "rxjs";
import {EtatOrdreMission} from "../model/etat-ordre-mission";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrdreMissionService {


  constructor(private backend: BackendService) { }

  getAll():Observable<OrdreMission[]>{
    return this.backend.sendGetRequest<OrdreMission[]>("mission");
  }

  getAllByEtat(etat:EtatOrdreMission):Observable<OrdreMission[]>{
    const param = new HttpParams()
      .append("etat",etat.toString());
    return this.backend.sendGetRequest<OrdreMission[]>("mission/search/etat",param);
  }

}
