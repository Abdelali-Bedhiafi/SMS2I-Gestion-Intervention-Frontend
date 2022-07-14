import { HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from './backend.service';
import { OrdreMission } from './ordre-mission';

@Injectable({
  providedIn: 'root'
})
export class OrdreMissionService {

  constructor(private backend: BackendService) { }

getAll():Observable<OrdreMission[]>{
  return this.backend.sendGetRequest<OrdreMission[]>("mission");
}

affecter(missionId: number, technicienId: number):Observable<OrdreMission>{

  let params: HttpParams = new HttpParams().append("missionId",missionId).append("technicienId",technicienId);
  return this.backend.sendPostRequest<OrdreMission>("mission/affecter",params);
}

}
