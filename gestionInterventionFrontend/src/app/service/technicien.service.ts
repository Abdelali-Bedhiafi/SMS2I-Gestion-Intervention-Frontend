import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Technicien } from '../model/technicien';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TechnicienService {

  constructor(private backend: BackendService) { }
  getAll():Observable<Technicien[]>{
    return this.backend.sendGetRequest<Technicien[]>("technicien");
  }

}
