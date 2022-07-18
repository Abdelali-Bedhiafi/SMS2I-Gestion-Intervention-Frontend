import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Depense } from '../model/depense';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {

  depenses!: Depense[];
  ready=false;
  constructor(private backend: BackendService) {
    this.backend.sendGetRequest<Depense[]>("DepencesDeplacement/getAll").subscribe( list => {this.depenses=list; this.ready=true});
  }

  update(){

  }
}
