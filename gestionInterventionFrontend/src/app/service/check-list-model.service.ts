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
}
