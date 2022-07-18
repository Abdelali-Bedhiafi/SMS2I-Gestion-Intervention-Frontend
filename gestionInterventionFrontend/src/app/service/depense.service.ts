import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Depense } from '../model/depense';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {



  constructor(private backend: BackendService) { }

  getAll():Observable<Depense[]>{
    return this.backend.sendGetRequest<Depense[]>("DepencesDeplacement");
  }
  update(){

  }
}
