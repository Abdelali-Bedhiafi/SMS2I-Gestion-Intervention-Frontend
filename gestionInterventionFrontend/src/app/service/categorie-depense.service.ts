import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategorieDepense } from '../model/categorie-depense';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class CategorieDepenseService {

  constructor(private backend:BackendService ) { }

  categories():Observable<CategorieDepense[]>{
    return this.backend.sendGetRequest<CategorieDepense[]>("CategorieDepences")
  }
}
