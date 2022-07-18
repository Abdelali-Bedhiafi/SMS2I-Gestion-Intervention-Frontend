import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../service/backend.service';
import { OrdreMissionCreation } from './ordre-mission-creation';
import { OrdreMissionDetail } from './ordre-mission-detail';

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
}


