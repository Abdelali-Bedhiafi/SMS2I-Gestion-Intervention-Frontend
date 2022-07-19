import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../../service/backend.service';
import { OrdreMissionCreation } from '../model/ordre-mission-creation';
import { OrdreMissionDetail } from '../model/ordre-mission-detail';
import {HttpParams} from "@angular/common/http";
import {OrdreMission} from "../../model/ordre-mission";
import {SousCategorie} from "../../model/sous-categorie";

@Injectable({
  providedIn: 'root'
})
export class OrdreMissionService {

  constructor(private backend: BackendService) { }

  getById(id: number):Observable<OrdreMissionDetail>{
    return this.backend.sendGetRequest("mission/"+id);
  }

  create(ordreMission: OrdreMissionCreation):Observable<OrdreMissionDetail>{
    return this.backend.sendPostRequest<OrdreMissionDetail>("mission",ordreMission);
  }

  affecter(missionId: number, technicienId: number):Observable<OrdreMission>{
    const params = new HttpParams()
      .append("missionId",missionId)
      .append("technicienId",technicienId);
    return this.backend.sendPostRequest<OrdreMission>("mission/affecter",{},params);
  }

  updateObject(object: SousCategorie[],missionId:number):Observable<OrdreMissionDetail>{
    const params = new HttpParams()
      .append("missionId",missionId);
    console.log(object.map(value =>{ return {id: value.id}}))
    return this.backend.sendPostRequest<OrdreMissionDetail>("mission/object",object.map(value =>{ return {id: value.id}}),params);
  }
}


