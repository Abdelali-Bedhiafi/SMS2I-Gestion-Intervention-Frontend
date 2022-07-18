import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrdreMissionService} from "../service/ordre-mission.service";
import {OrdreMissionDetail} from "../model/ordre-mission-detail";
import {CheckListModelService} from "../../service/check-list-model.service";
import {Observable} from "rxjs";
import {CheckListModel} from "../../model/check-list-model";
import {SousCategorie} from "../../model/sous-categorie";
import {SousCategorieService} from "../../service/sous-categorie.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ObjetMission} from "../model/objet-mission";


@Component({
  selector: 'app-detail-ordre-mission',
  templateUrl: './detail-ordre-mission.component.html',
  styleUrls: ['./detail-ordre-mission.component.css']
})
export class DetailOrdreMissionComponent implements OnInit {

  ordreMission!: OrdreMissionDetail;
  action$!:Observable<SousCategorie[]>;
  reseau$!:Observable<SousCategorie[]>;
  technologie$!:Observable<SousCategorie[]>;
  ready = false;
  objetMission!: FormGroup<ObjetMission>;
  constructor(private route: ActivatedRoute,
              private ordreMission$: OrdreMissionService,
              /*public model$: CheckListModelService*/
              private objet$: SousCategorieService) { }

  ngOnInit(): void {
    this.action$=this.objet$.getAllByCategorie("ActionOrdre");
    this.reseau$=this.objet$.getAllByCategorie("ActionRapport");
    this.technologie$=this.objet$.getAllByCategorie("Technologie");
    this.route.paramMap.subscribe(params=>{
      let id = Number.parseInt(<string>params.get("id"));
      this.ordreMission$.getById(1).subscribe(ordre => {
        this.ordreMission=ordre;
        this.createObjetMissionForm(this.ordreMission.sousCategories);
        this.ready=true;
      });
    });
  }
  createObjetMissionForm(sousCategories: SousCategorie[]){
    let action:SousCategorie[]=[];
    let reseau:SousCategorie[]=[];
    let technologie:SousCategorie[]=[];
    sousCategories.forEach(sousCategorie =>{
      switch (sousCategorie.categorie) {
        case "ActionOrdre":
          action.push(sousCategorie);
          break;
        case "ActionRapport":
          reseau.push(sousCategorie);
          break;
        case "Technologie":
          technologie.push(sousCategorie);
          break;
      }
    });
    this.objetMission= new FormGroup<ObjetMission>({
      actions: new FormControl<SousCategorie[] | null>(action),
      reseaux: new FormControl<SousCategorie[] | null>(reseau),
      technologies: new FormControl<SousCategorie[] | null>(technologie)
    })
  }
}
