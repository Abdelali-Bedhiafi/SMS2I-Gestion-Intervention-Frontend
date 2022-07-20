import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { OrdreMission } from '../model/ordre-mission';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrdreMissionService {


  constructor(private backend: BackendService) { }

  getAll():Observable<OrdreMission[]>{
    return this.backend.sendGetRequest<OrdreMission[]>("mission");
  }

}
