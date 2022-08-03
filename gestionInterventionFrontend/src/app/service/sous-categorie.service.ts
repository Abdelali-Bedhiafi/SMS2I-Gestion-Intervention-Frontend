import { Injectable } from '@angular/core';
import {BackendService} from "./backend.service";
import {Observable} from "rxjs";
import {SousCategorie} from "../model/sous-categorie";
import {Categorie} from "../model/categorie";

@Injectable({
  providedIn: 'root'
})
export class SousCategorieService {

  constructor(private backend: BackendService) { }

  getAllByCategorie(categorie: Categorie):Observable<SousCategorie[]>{
    return this.backend.sendGetRequest<SousCategorie[]>("sousCategorie/search/categorie/"+categorie);
  }

  add(sousCategorie:SousCategorie):Observable<SousCategorie>{
    return this.backend.sendPostRequest<SousCategorie>("sousCategorie",sousCategorie);
  }

  update(categorie: SousCategorie):Observable<SousCategorie> {
    return this.backend.sendPutRequest<SousCategorie>("sousCategorie/"+categorie.id,categorie);
  }

  delete(categorie: SousCategorie):Observable<void> {
    return this.backend.sendDeleteRequest<void>("sousCategorie/"+categorie.id);
  }
}
