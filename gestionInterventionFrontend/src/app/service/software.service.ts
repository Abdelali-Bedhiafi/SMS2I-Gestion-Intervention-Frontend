import { Injectable } from '@angular/core';
import {BackendService} from "./backend.service";
import {Observable} from "rxjs";
import {Software} from "../model/software";

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  constructor(private backend: BackendService) { }

  getAll():Observable<Software[]>{
    return this.backend.sendGetRequest<Software[]>("Software");
  }
}
