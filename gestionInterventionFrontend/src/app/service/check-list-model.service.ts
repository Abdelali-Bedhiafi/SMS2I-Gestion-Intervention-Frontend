import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CheckListModel} from "../model/check-list-model";
import {BackendService} from "./backend.service";


@Injectable({
  providedIn: 'root'
})
export class CheckListModelService {

  constructor(private backend: BackendService) { }

  getAll():Observable<CheckListModel[]>{
    return this.backend.sendGetRequest<CheckListModel[]>("checkListModel");
  }

  getById(id: number){
    return this.backend.sendGetRequest<CheckListModel>("checkListModel/"+id);
  }

  add(model:{id:number,nom:string}){
    return this.backend.sendPostRequest<CheckListModel>("checkListModel",model);
  }

  update(model:CheckListModel){
    return this.backend.sendPutRequest<CheckListModel>("checkListModel/"+model.id,this.idOnly(model));
  }

  delete(model: CheckListModel){
    return this.backend.sendDeleteRequest<void>("checkListModel/"+model.id);
  }

  idOnly(model:CheckListModel){
    return {
      id:model.id,
      nom: model.nom,
      materiels: model.materiels.map(m => { return {id: m.id}; }),
      softwares: model.softwares.map(s => { return {id: s.id}; }),
      softwareCategories: model.softwareCategories.map(c => { return {id: c.id}; })
    };
  }
}
