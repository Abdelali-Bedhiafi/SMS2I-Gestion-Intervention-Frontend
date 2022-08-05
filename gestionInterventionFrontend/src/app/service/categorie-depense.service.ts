import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategorieDepense } from '../model/categorie-depense';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class CategorieDepenseService {

  constructor(private backend:BackendService ) { }

  getAll():Observable<CategorieDepense[]>{
    return this.backend.sendGetRequest<CategorieDepense[]>("CategorieDepences")
  }

  add(categorie: CategorieDepense) {
    return this.backend.sendPostRequest<CategorieDepense>("CategorieDepences",categorie);
  }

  update(categorie: CategorieDepense) {
    return this.backend.sendPutRequest<CategorieDepense>("CategorieDepences/"+categorie.id,categorie);
  }

  delete(categorie: CategorieDepense) {
    return this.backend.sendDeleteRequest<void>("CategorieDepences/"+categorie.id);
  }
}
