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

  add(software: { id: number,softwareLabel: string,softwareVersion: string,categorie:{id: number}}):Observable<Software> {
    return this.backend.sendPostRequest<Software>("Software",software);
  }

  update(software: { id: number,softwareLabel: string,softwareVersion: string,categorie:{id: number}}):Observable<Software> {
    return this.backend.sendPostRequest("Software/"+software.id,software);
  }

  delete(software: Software):Observable<void> {
    return this.backend.sendDeleteRequest<void>("software/"+software.id);
  }

}
