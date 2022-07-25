import { Injectable } from '@angular/core';
import {BackendService} from "./backend.service";
import {Observable} from "rxjs";
import {CheckList} from "../model/check-list";
import {CheckListModel} from "../model/check-list-model";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CheckListService {

  constructor(private backend : BackendService) { }

  getById(id: number):Observable<CheckList>{
    return this.backend.sendGetRequest<CheckList>("checklist/"+id);
  }

  update(id: number, checkList: CheckList):Observable<CheckList>{
    return this.backend.sendPutRequest<CheckList>("checklist/"+id,this.idOnly(checkList));
  }

  create(model: CheckListModel, missionId: number):Observable<CheckList>{
    const params = new HttpParams()
      .append("modelId", model.id)
      .append("missionId", missionId);
    return this.backend.sendPostRequest<CheckList>("checklist/model",{},params);
  }

  idOnly(checkList: CheckList ){
    return {
      id:checkList.id,
      materiels:checkList.materiels.map(m =>{ return {id: m.id}; }),
      softwares:checkList.softwares.map(s =>{ return {id: s.id}; }),
      model:{id:checkList.model.id},
      ordreMission:{id:checkList.ordreMission}
    };
  }
}


