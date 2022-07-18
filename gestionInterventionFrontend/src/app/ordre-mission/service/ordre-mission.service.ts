import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../../service/backend.service';
import { OrdreMissionCreation } from '../model/ordre-mission-creation';
import { OrdreMissionDetail } from '../model/ordre-mission-detail';
import {HttpParams} from "@angular/common/http";
import {OrdreMission} from "../../model/ordre-mission";

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
    const params: HttpParams = new HttpParams()
      .append("missionId",missionId)
      .append("technicienId",technicienId);
    return this.backend.sendPostRequest<OrdreMission>("mission/affecter",{},params);
  }
}


