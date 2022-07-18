import { Injectable } from '@angular/core';
import {BackendService} from "./backend.service";
import {Observable} from "rxjs";
import {SoftwareCategorie} from "../model/software-categorie";

@Injectable({
  providedIn: 'root'
})
export class SoftwareCategorieService {

  constructor(private backend: BackendService) { }

  getById(id: number):Observable<SoftwareCategorie>{
    return this.backend.sendGetRequest<SoftwareCategorie>("softwareCategorie/"+id);
  }
}
