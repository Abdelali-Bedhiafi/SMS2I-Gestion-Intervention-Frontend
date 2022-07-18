import { Injectable } from '@angular/core';
import {BackendService} from "./backend.service";
import {Observable} from "rxjs";
import {SousCategorie} from "../model/sous-categorie";

@Injectable({
  providedIn: 'root'
})
export class SousCategorieService {

  constructor(private backend: BackendService) { }

  getAllByCategorie(categorie: string):Observable<SousCategorie[]>{
    return this.backend.sendGetRequest<SousCategorie[]>("sousCategorie/search/categorie/"+categorie);
  }
}
