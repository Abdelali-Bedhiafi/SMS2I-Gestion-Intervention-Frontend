import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from './backend.service';
import { Technicien } from './technicien';

@Injectable({
  providedIn: 'root'
})
export class TechnicienService {

  constructor(private backend: BackendService) { }


  getAll():Observable<Technicien[]>{
    return  this.backend.sendGetRequest<Technicien[]>("technicien");
  }

  affecter(missionId: number, technicienId: number):void{
    let params: HttpParams = new HttpParams();
    params.append("missionId",missionId);
    params.append("technicienId",technicienId);
    this.backend.sendPostRequest("mission/affecter",params);
  }
}
