import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Technicien } from './technicien';

@Injectable({
  providedIn: 'root'
})
export class TechnicienService {
  techniciens: Map<number,Technicien>;

  constructor(private backend: BackendService) {
    this.techniciens = new Map<number,Technicien>();
    this.backend.sendGetRequest<Technicien[]>("technicien").subscribe(list=>{
      list.forEach(technicien=>{
        this.techniciens.set(technicien.id,technicien);
      });
    });
  }

}
