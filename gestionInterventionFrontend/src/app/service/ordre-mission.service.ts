import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { OrdreMission } from '../model/ordre-mission';

@Injectable({
  providedIn: 'root'
})
export class OrdreMissionService {
  ordresMission: Map<number,OrdreMission>;
  ready: Promise<boolean>;

  constructor(private backend: BackendService) {
    this.ordresMission = new Map<number,OrdreMission>();
    this.ready = new Promise<boolean>((resolve)=>{
      this.backend.sendGetRequest<OrdreMission[]>("mission")
        .subscribe(list=> {
          list.forEach(mission => this.ordresMission.set(mission.id, mission));
          resolve(true);
        });
    });
  }

}
