import { Injectable } from '@angular/core';
import {BackendService} from "./backend.service";
import {Observable} from "rxjs";
import {Software} from "../model/software";

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  constructor(private backend: BackendService) { }

  getById(id:number):Observable<Software>{
    return this.backend.sendGetRequest<Software>("software/"+id);
  }
}
