import { HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from './backend.service';
import { OrdreMission } from './ordre-mission';

@Injectable({
  providedIn: 'root'
})
export class OrdreMissionService {
  ordresMission: Map<number,OrdreMission>;

  constructor(private backend: BackendService) {
    this.ordresMission = new Map<number,OrdreMission>();
    this.backend.sendGetRequest<OrdreMission[]>("mission").subscribe(list=> {
      console.log(list);
      list.forEach(mission=> this.ordresMission.set(mission.id,mission));
    });
   }

affecter(missionId: number, technicienId: number){
  if(missionId in this.ordresMission.keys()){
    const params: HttpParams = new HttpParams().append("missionId",missionId).append("technicienId",technicienId);
    this.backend.sendPostRequest<OrdreMission>("mission/affecter",{},params).subscribe(mission=>{
      this.ordresMission.set(missionId,mission);
    });
  }
}

}
