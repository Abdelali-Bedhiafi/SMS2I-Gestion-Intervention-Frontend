import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Subject} from "rxjs";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ThemePalette} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";


import {SousCategorie} from "../../model/sous-categorie";
import {Deplacement} from "../model/deplacement";
import {OrdreMissionDetail} from "../model/ordre-mission-detail";
import {EtatOrdreMission} from "../../model/etat-ordre-mission";

import {AffectTechnicienDialogComponent} from "../dialog/affect-technicien-dialog/affect-technicien-dialog.component";
import {CreateDeplacementDialogComponent} from "../dialog/create-deplacement-dialog/create-deplacement-dialog.component";
import {EditDeplacementDialogComponent} from "../dialog/edit-deplacement-dialog/edit-deplacement-dialog.component";
import {
  SelectCheckListModelDialogComponent
} from "../dialog/select-check-list-model-dialog/select-check-list-model-dialog.component";

import {OrdreMissionService} from "../service/ordre-mission.service";
import {DeplacementService} from "../service/deplacement.service";
import {CheckListService} from "../../service/check-list.service";
import {TechnicienService} from "../../service/technicien.service";
import {BonInterventionService} from "../../service/bon-intervention.service";

import {getMaxValidator} from "../../app.component";
import {Categorie} from "../../model/categorie";
import {AuthService} from "../../service/auth.service";


export interface SousCategorieData{
  sousCategorie: SousCategorie;
  selected: boolean;
  color: ThemePalette;
}


@Component({
  selector: 'app-detail-ordre-mission',
  templateUrl: './detail-ordre-mission.component.html',
  styleUrls: ['./detail-ordre-mission.component.css']
})
export class DetailOrdreMissionComponent implements OnInit {

  ordreMission!: OrdreMissionDetail;

  accompteControl!: FormGroup<{accompte: FormControl<number|null>, retour: FormControl<number|null> }>;
  estimationControl!: FormGroup<{date: FormControl<Date|null>, duree: FormControl<number|null>}>;
  infoControl!: FormGroup<{description: FormControl<string|null>, reclamation: FormControl<string|null>}>;
  designationControl!: FormControl<string|null>;


  ready = false;
  accompteChanges = false;
  estimationChanges = false;
  infoChanges = false;
  designationChanges= false;

  root_path!: string;

  bonSortieEmpty=true;
  bonRetourEmpty=true;
  ordreMissionEmpty=true;

  actionChanges=false;
  technologieChanges=false;
  keywordsChanges=false;

  actions!: Subject<SousCategorie[]>;
  technologies!: Subject<SousCategorie[]>;
  keywords!: Subject<SousCategorie[]>;


  categorie = Categorie

  constructor(private route: ActivatedRoute,
              private ordreMission$: OrdreMissionService,
              private deplacement$: DeplacementService,
              private checklist: CheckListService,
              private technicien: TechnicienService,
              private bonIntervention: BonInterventionService,
              private router: Router,
              private auth: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.root_path= this.ordreMission$.getRootPath();
    this.route.paramMap.subscribe(params=>{
      const id = Number(<string>params.get("id"));
      this.ordreMission$.checkFiles(id).subscribe(list =>{
        this.bonSortieEmpty=!list[0];
        this.bonRetourEmpty=!list[1];
        this.ordreMissionEmpty=!list[3];
      });
      this.ordreMission$.getById(id).subscribe(ordre => {
        this.ordreMission=ordre;
        this.actions = new BehaviorSubject(ordre.sousCategories.filter(c => c.categorie==Categorie.ACTION_ORDRE));
        this.technologies = new BehaviorSubject(ordre.sousCategories.filter(c => c.categorie==Categorie.TECHNOLOGIE));
        this.keywords = new BehaviorSubject(ordre.sousCategories.filter(c => c.categorie==Categorie.KEYWORDS));
        this.initControl(ordre);
        this.setChangesHooks();
        this.ready=true;
      });
    });
  }

  initControl(ordre: OrdreMissionDetail){
    this.accompteControl = new FormGroup({
      accompte: new FormControl(ordre.accompteMission, {validators: Validators.min(0),updateOn:"blur"}),
      retour: new FormControl(ordre.retourAccompte, {validators: Validators.min(0),updateOn:"blur"})
    }, getMaxValidator("accompte","retour"));
    this.estimationControl = new FormGroup({
      date: new FormControl(ordre.dateDebutEstimee),
      duree: new FormControl(ordre.dureeEstimee, {updateOn:"blur"})
    });
    this.infoControl = new FormGroup({
      description: new FormControl(ordre.descriptionMission, {updateOn:"blur"}),
      reclamation: new FormControl(ordre.retourClient, {updateOn:"blur"}),
    })
    this.designationControl = new FormControl(ordre.designation, {updateOn:"change"});
  }

  setChangesHooks(){
    this.accompteControl.valueChanges.subscribe(value => {
      this.accompteChanges = this.ordreMission.accompteMission!= value.accompte || this.ordreMission.retourAccompte != value.retour;
    });
    this.estimationControl.valueChanges.subscribe(value =>
      this.estimationChanges = value.date != this.ordreMission.dateDebutEstimee || value.duree != this.ordreMission.dureeEstimee
    );
    this.infoControl.valueChanges.subscribe(value =>
      this.infoChanges = value.description != this.ordreMission.descriptionMission || value.reclamation != this.ordreMission.retourClient
    );
    this.designationControl.valueChanges.subscribe(value =>
      this.designationChanges = value != this.ordreMission.designation
    );
  }

  view = (c: SousCategorie):string => c.titre;

  submitObjetChanges(){
    this.ordreMission$.updateObject(this.ordreMission.sousCategories,this.ordreMission.id).subscribe(detail=>{
      this.actionChanges=false;
      this.keywordsChanges=false;
      this.technologieChanges=false;
      this.actions.next(detail.sousCategories.filter(c => c.categorie== Categorie.ACTION_ORDRE));
      this.technologies.next(detail.sousCategories.filter(c => c.categorie== Categorie.TECHNOLOGIE));
      this.keywords.next(detail.sousCategories.filter(c => c.categorie== Categorie.KEYWORDS));
    });
  }

  submitAccompteChanges(){
    const value= this.accompteControl.value;
    this.ordreMission$.updateAccompte(this.ordreMission.id, (value.accompte)? value.accompte:0, (value.retour)? value.retour:0)
      .subscribe(ordre =>{
        this.accompteChanges=false;
        this.ordreMission.etat = ordre.etat;
        this.ordreMission.accompteMission=ordre.accompteMission;
        this.ordreMission.retourAccompte=ordre.retourAccompte;
      });
  }

  submitInfoChanges(){
    const value = this.infoControl.value;
    this.ordreMission$.updateInfo(
      this.ordreMission.id,
      {
        description: (value.description)? value.description:"",
        reclamation: (value.reclamation)? value.reclamation:""}
    ).subscribe(ordre=> {
      this.ordreMission.descriptionMission=ordre.descriptionMission;
      this.ordreMission.retourClient=ordre.retourClient;
      this.infoChanges = false;
    });
  }

  submitEstimationChanges(){
    const value = this. estimationControl.value;
    this.ordreMission$.updateEstimation(
      this.ordreMission.id,
      (value.date)? value.date :null,
      (value.duree)? value.duree : 0
    ).subscribe(ordre=> {
      this.ordreMission.dureeEstimee=ordre.dureeEstimee;
      this.ordreMission.dateDebutEstimee=ordre.dateDebutEstimee;
      this.estimationChanges = false;
    });
  }

  affecterTechnicien() {
    const affectedTechnicien = this.ordreMission.techniciens.map( tech => tech.id);
    this.technicien.getAll().subscribe(list =>{
      const dialogRef = this.dialog.open(AffectTechnicienDialogComponent,{data: list.filter( tech => affectedTechnicien.findIndex( id => id == tech.id) < 0)});
      dialogRef.afterClosed().subscribe(technicien=>{
        if(technicien) this.ordreMission$.affecter(this.ordreMission.id,technicien.id).subscribe( mission =>{
          if(mission) {
            if (this.ordreMission.techniciens) this.ordreMission.techniciens.push(technicien);
            else this.ordreMission.techniciens=[technicien];
            this.ordreMission.etat=mission.etat;
          }
        });
      });
    });
  }

  ajouterDeplacement() {
    const dialogRef = this.dialog.open(CreateDeplacementDialogComponent);
    dialogRef.afterClosed().subscribe(data=>{
      if (data){
        const deplacement: Deplacement ={
          id: 0,
          date: data.date,
          heureDebut: data.heureDebut,
          heureFin: data.heureFin
        };
        this.deplacement$.create(deplacement,this.ordreMission.id).subscribe(dp=>{
          if(dp){
            if(this.ordreMission.deplacements) {
              this.ordreMission.deplacements.push(dp);
              this.ordreMission.etat=EtatOrdreMission.EN_COUR;
            }
            else this.ordreMission.deplacements=[dp];
          }
        });
      }
    });
  }

  editDeplacement(deplacement: Deplacement) {
    const dialogRef = this.dialog.open(EditDeplacementDialogComponent,{data:deplacement});
    dialogRef.afterClosed().subscribe(data=>{
      if(data){
        const body: Deplacement ={
          id: deplacement.id,
          date: data.date,
          heureDebut: data.heureDebut,
          heureFin: data.heureFin
        };
        this.deplacement$.update(body,this.ordreMission.id).subscribe(d=>{
          const index = this.ordreMission.deplacements.findIndex(item => item.id==d.id);
          this.ordreMission.deplacements.splice(index,1,d);
        });
      }
    });
  }

  selectChecklistModel() {
    const dialogRef = this.dialog.open(SelectCheckListModelDialogComponent);
    dialogRef.afterClosed().subscribe(model=>{
      if(model) this.checklist.create(model,this.ordreMission.id).subscribe(checklist =>{
        this.ordreMission.checklist = checklist;
      });
    });
  }

  timeFormat(time:string):string{
    return time?.slice(0,5);
  }

  submitDesignation() {
    const designation = <string> this.designationControl.value;
    this.ordreMission$.updateDesignation(this.ordreMission.id, designation).subscribe(ordre=>{
      this.ordreMission.designation=ordre.designation;
      this.designationChanges = false ;
    });
  }

  addBonIntervention() {
    this.bonIntervention.add(this.ordreMission.id).subscribe(bon=>{
      this.router.navigate(['/detailBon',bon.id]).then();
    });
  }

  loadFile($event: Event, file: string) {
    const files = (<HTMLInputElement>$event.target).files;
    if((files?.length == 1)  && file) {
      this.ordreMission$.uploadFile(files[0], this.ordreMission, file).subscribe();
      switch (file) {
        case 'OrdreMission':
          this.ordreMissionEmpty=false;
          break;
        case 'BonSortie':
          this.bonSortieEmpty=false;
          break;
        case 'BonRetour':
          this.bonRetourEmpty=false;
          break;
      }
    }
  }

  getPath():string {
    return this.ordreMission.client.nom+"_"+this.ordreMission.designation+"_"+this.ordreMission.dateMission.toString().slice(0,10);
  }

  objetChangesHandler($event: { changes:boolean,sousCategorie: SousCategorie, event: "ADD"|"REMOVE" }) {
    if($event.event==="ADD") this.ordreMission.sousCategories.push($event.sousCategorie);
    else if ($event.event === "REMOVE"){
      const i = this.ordreMission.sousCategories.findIndex(value => value.id === $event.sousCategorie.id);
      this.ordreMission.sousCategories.splice(i, 1);
    }
    switch ($event.sousCategorie.categorie) {
      case Categorie.ACTION_ORDRE:
        this.actionChanges=$event.changes;
        break;
      case Categorie.TECHNOLOGIE:
        this.technologieChanges=$event.changes;
        break;
      case Categorie.KEYWORDS:
        this.keywordsChanges=$event.changes;
    }
  }

  technicienAssocie() {
    return this.ordreMission.techniciens.findIndex(tech => tech.id == this.auth.getId()) != -1;
  }

  agent(){
    return this.auth.getRole()== "AGENT";
  }

  superviseurAssocie(): boolean {
    return this.auth.getId()==this.ordreMission.superviseur.id;
  }

}
