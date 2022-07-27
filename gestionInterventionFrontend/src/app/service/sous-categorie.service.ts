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

}
