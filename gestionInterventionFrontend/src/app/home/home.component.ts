import {Component, OnInit} from '@angular/core';
import {OrdreMissionService} from 'src/app/service/ordre-mission.service';
import {forkJoin, Observable, of} from "rxjs";
import {OrdreMission} from "../model/ordre-mission";
import {EtatOrdreMission} from "../model/etat-ordre-mission";
import {FormControl, FormGroup} from "@angular/forms";
import {TechnicienService} from "../service/technicien.service";
import {ClientService} from "../service/client.service";
import {Client} from "../model/client";
import {Technicien} from "../model/technicien";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ordre$!: Observable<OrdreMission[]>;
  client$!: Observable<Client[]> ;
  technicien$!: Observable<Technicien[]>;
  missionSearchControl = new FormGroup({
    client: new FormControl<Client|null>(null),
    technicien: new FormControl<Technicien|null>(null),
    date: new FormControl<Date|null>(null),
    etat: new FormControl<EtatOrdreMission|null>(null)
  });
  etat = new FormControl<EtatOrdreMission>(EtatOrdreMission.CREE,{nonNullable:true});
  etats = [EtatOrdreMission.CREE,EtatOrdreMission.AFFECTEE,EtatOrdreMission.EN_PREPARATION,EtatOrdreMission.EN_COUR,EtatOrdreMission.EN_ATTENTE_VALIDATION,EtatOrdreMission.TERMINEE]
  advanced: boolean=false;
  searchValid = false;
  serachMap : Map<number,OrdreMission> = new Map()
  searchResult!: OrdreMission[];
  idControl: FormControl<number|null> = new FormControl(null) ;

  constructor(private ordre:  OrdreMissionService,
              private technicien: TechnicienService,
              private client: ClientService) { }

  ngOnInit(): void {
    this.ordre$=this.ordre.getAllByEtat(EtatOrdreMission.CREE);
    this.client$= this.client.getAll();
    this.technicien$=this.technicien.getAll();
    this.etat.valueChanges.subscribe(etat => this.ordre$= this.ordre.getAllByEtat(etat));
    this.missionSearchControl.valueChanges.subscribe(value=>
      this.searchValid = value.date!=null  || value.client!=null || value.technicien!=null
    );
  }



  advanceSearch() {
    const value = this.missionSearchControl.value;
    const client = (value.client)? this.ordre.getAllByClient(value.client.id) : of<OrdreMission[]>([]);
    const technicien = (value.technicien)? this.ordre.getAllByTechnicien(value.technicien.id) : of<OrdreMission[]>([]);
    const date = (value.date)? this.ordre.getAllByDateMission(value.date) : of<OrdreMission[]>([]);
    this.serachMap.clear();
    forkJoin([client,technicien,date]).subscribe( lists =>{
     if(value.etat) lists.forEach(list => list.filter( ordre => ordre.etat==value.etat).forEach( ordre => this.serachMap.set(ordre.id,ordre)));
     else lists.forEach(list => list.forEach( ordre => this.serachMap.set(ordre.id,ordre)));
     this.searchResult = Array.from(this.serachMap.values());
    });



  }

  resetDate() {
    this.missionSearchControl.controls.date.reset();
  }

  search() {
    if(this.idControl.value){
      this.serachMap.clear()
      this.ordre.getById(this.idControl.value).subscribe( mission =>{
        this.serachMap.set(mission.id,mission);
        this.searchResult = Array.from(this.serachMap.values());
      });
    }
  }
}




