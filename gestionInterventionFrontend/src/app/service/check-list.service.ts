import { Injectable } from '@angular/core';
import {BackendService} from "./backend.service";
import {Observable} from "rxjs";
import {CheckList} from "../model/check-list";

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

  idOnly(checkList: CheckList ):IdOnlyChecklist{
    let idOnly : IdOnlyChecklist = {id:checkList.id,materiels:[],softwares:[],model:{id:checkList.model.id}};
    for (const software of checkList.softwares) {
      idOnly.softwares.push({id:software.id});
    }
    for (const materiel of checkList.materiels) {
      idOnly.materiels.push({id:materiel.id});
    }
    return idOnly;
  }
}

interface IdOnlyChecklist{
  id: number;
  materiels: {id: number}[];
  softwares: {id:number}[];
  model: {id:number};
}
