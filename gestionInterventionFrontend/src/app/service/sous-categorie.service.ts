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

  add(sousCategorie:SousCategorie):Observable<SousCategorie>{
    const body ={
      titre: sousCategorie.titre,
      description: sousCategorie.description,
      categorie: {
        id: this.getCategorieId(sousCategorie.categorie)
      }
    };
    return this.backend.sendPostRequest<SousCategorie>("sousCategorie",body);
  }

  getCategorieId(categorie: string):number{
    switch (categorie){
      case "ActionOrdre":
        return 1;
      case "Reseau":
        return 2;
      case "Technologie":
        return 3;
      case "ActionRapport":
        return 4;
      default :
        return 5;
    }
  }

}
