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

  getAll():Observable<SoftwareCategorie[]>{
    return this.backend.sendGetRequest<SoftwareCategorie[]>("softwareCategorie")
  }

  add(categorie: { id: number, nom: string }):Observable<SoftwareCategorie> {
    return this.backend.sendPostRequest<SoftwareCategorie>("softwareCategorie",categorie);
  }

  update(categorie: { id: number, nom: string }):Observable<SoftwareCategorie> {
    return this.backend.sendPutRequest<SoftwareCategorie>("softwareCategorie/"+categorie.id,categorie);
  }

  delete(categorie: SoftwareCategorie) {
    return this.backend.sendDeleteRequest<void>("softwareCategorie/"+categorie.id);
  }
}
