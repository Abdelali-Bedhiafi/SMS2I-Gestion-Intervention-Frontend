import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ThemePalette} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {map, Observable, startWith} from "rxjs";

import {SousCategorie} from "../../model/sous-categorie";
import {Deplacement} from "../model/deplacement";
import {OrdreMissionDetail} from "../model/ordre-mission-detail";

import {AffectTechnicienDialogComponent} from "../affect-technicien-dialog/affect-technicien-dialog.component";
import {CreateDeplacementDialogComponent} from "../create-deplacement-dialog/create-deplacement-dialog.component";
import {EditDeplacementDialogComponent} from "../edit-deplacement-dialog/edit-deplacement-dialog.component";
import {SelectCheckListModelDialogComponent} from "../select-check-list-model-dialog/select-check-list-model-dialog.component";

import {OrdreMissionService} from "../service/ordre-mission.service";
import {SousCategorieService} from "../../service/sous-categorie.service";
import {DeplacementService} from "../service/deplacement.service";
import {CheckListService} from "../../service/check-list.service";
import {TechnicienService} from "../../service/technicien.service";


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

  actions: SousCategorieData[]=[];
  reseaux: SousCategorieData[]=[];
  technologies: SousCategorieData[]=[];

  actionSelectControl= new FormControl();
  reseauSelectControl= new FormControl();
  technologieSelectControl= new FormControl();

  accompteControl!: FormControl<number|null>;
  retourControl!: FormControl<number|null>;
  estimationControl!: FormGroup<{date: FormControl<Date|null>, duree: FormControl<number|null>}>;
  infoControl!: FormGroup<{description: FormControl<string|null>, reclamation: FormControl<string|null>}>;

  filteredActions: Observable<SousCategorieData[]>;
  filteredReseaux: Observable<SousCategorieData[]>;
  filteredTechnologies: Observable<SousCategorieData[]>;

  actionReady!: Promise<boolean>;
  reseauReady!: Promise<boolean>;
  technologieReady!: Promise<boolean>;

  ready = false;
  objetChanges = false;
  accompteChanges = false;
  estimationChanges = false;
  infoChanges = false;

  constructor(private route: ActivatedRoute,
              private ordreMission$: OrdreMissionService,
              private objet$: SousCategorieService,
              private deplacement$: DeplacementService,
              private checklist: CheckListService,
              private technicien: TechnicienService,
              private dialog: MatDialog) {
    this.filteredActions = this.actionSelectControl.valueChanges.pipe(
      startWith<string>(''),
      map(value=> typeof value === 'string' ? value : ''),
      map(filter => this.filter(this.actions,filter))
    );
    this.filteredReseaux = this.reseauSelectControl.valueChanges.pipe(
      startWith<string>(''),
      map(value=> typeof value === 'string' ? value : ''),
      map(filter => this.filter(this.reseaux,filter))
    );
    this.filteredTechnologies = this.technologieSelectControl.valueChanges.pipe(
      startWith<string>(''),
      map(value=> typeof value === 'string' ? value : ''),
      map(filter => this.filter(this.technologies,filter))
    );

  }

  ngOnInit(): void {
    this.getAllSousCategorie();
    this.route.paramMap.subscribe(params=>{
      const id = Number.parseInt(<string>params.get("id"));
      this.ordreMission$.getById(id).subscribe(ordre => {
        this.ordreMission=ordre;
        this.setSelectedCategorie(this.ordreMission.sousCategories);
        this.initControl(ordre);
        this.setChangesHooks();
        this.ready=true;
      });
    });
  }

  initControl(ordre: OrdreMissionDetail){
    this.accompteControl = new FormControl(ordre.accompteMission,Validators.min(0));
    this.retourControl = new FormControl(ordre.retourAccompte,[Validators.min(0),this.getMaxValidator()]);
    this.estimationControl = new FormGroup({
      date: new FormControl(ordre.dateDebutEstime),
      duree: new FormControl(ordre.dureeEstime)
    });
    this.infoControl = new FormGroup({
      description: new FormControl(ordre.descriptionMission),
      reclamation: new FormControl(ordre.retourClient),
    })
  }

  setChangesHooks(){
    this.accompteControl.valueChanges.subscribe(value => {
      if(value!= this.ordreMission.accompteMission) this.accompteChanges = true;
      else if(value == this.ordreMission.accompteMission && this.retourControl.value == this.ordreMission.retourAccompte) this.accompteChanges=false;
    });
    this.retourControl.valueChanges.subscribe(value => {
      if(value!= this.ordreMission.retourAccompte) this.accompteChanges = true;
      else if(value == this.ordreMission.retourAccompte && this.accompteControl.value == this.ordreMission.accompteMission) this.accompteChanges=false;
    });
    this.estimationControl.valueChanges.subscribe(value =>
      this.estimationChanges = value.date != this.ordreMission.dateDebutEstime || value.duree != this.ordreMission.dureeEstime
    );
    this.infoControl.valueChanges.subscribe(value =>{
      this.infoChanges = value.description != this.ordreMission.descriptionMission || value.reclamation != this.ordreMission.retourClient
    }
    );
  }

  getAllSousCategorie(){
    this.actionReady= new Promise<boolean>((resolve)=>{
      this.objet$.getAllByCategorie("ActionOrdre").subscribe( data =>{
        data.forEach(sousCategorie => this.actions.push({sousCategorie: sousCategorie, selected: false, color: 'warn'}));
        resolve(true);
      });
    });
    this.reseauReady= new Promise<boolean>((resolve)=>{
      this.objet$.getAllByCategorie("ActionRapport").subscribe( data =>{
        data.forEach(sousCategorie => this.reseaux.push({sousCategorie: sousCategorie, selected: false, color: 'warn'}));
        resolve(true);
      });
    });
    this.technologieReady= new Promise<boolean>((resolve)=>{
      this.objet$.getAllByCategorie("Technologie").subscribe( data =>{
        data.forEach(sousCategorie => this.technologies.push({sousCategorie: sousCategorie, selected: false, color: 'warn'}));
        resolve(true);
      });
    });
  }

  filter(data:SousCategorieData[], filter: string):SousCategorieData[]{
    if(filter.length > 0){
      return data.filter(option => {
        return option.sousCategorie.titre.toLowerCase().indexOf(filter.toLowerCase()) >=0;
      });
    }else{
      return data;
    }
  }

  displayFn = (): string => '';

  setSelectedCategorie(sousCategories: SousCategorie[]){
    this.actionReady.then(()=>{
      this.actions.forEach(item=>{
        sousCategories.forEach(sousCategorie =>{
          if (sousCategorie.id==item.sousCategorie.id) {
            item.selected = true;
            item.color = 'primary'
          }
        });
      });
    });
    this.reseauReady.then(()=>{
      this.reseaux.forEach(item=>{
        sousCategories.forEach(sousCategorie =>{
          if (sousCategorie.id==item.sousCategorie.id){
            item.selected = true;
            item.color = 'primary'
          }
        });
      });
    });
    this.technologieReady.then(()=>{
      this.technologies.forEach(item=>{
        sousCategories.forEach(sousCategorie =>{
          if (sousCategorie.id==item.sousCategorie.id) {
            item.selected = true;
            item.color = 'primary'
          }
        });
      });
    });
  }

  optionClicked = (event: Event, data: SousCategorieData): void => {
    event.stopPropagation();
    this.toggleSelection(data);
  };

  toggleSelection = (data: SousCategorieData): void => {
    data.selected = !data.selected;
    if (data.selected) {
      this.ordreMission.sousCategories.push(data.sousCategorie);
    } else {
      const i = this.ordreMission.sousCategories.findIndex(value => value.id === data.sousCategorie.id);
      this.ordreMission.sousCategories.splice(i, 1);
    }
    this.checkChanges();
  };

  checkChanges(){
    if(this.objetChanges){
      //all primary are selected and all warm are not selected
      for(const item of this.actions){
        if ((item.color == 'primary' && !item.selected)||(item.color=="warn"&&item.selected)){
          return;
        }
      }
      for(const item of this.reseaux){
        if ((item.color == 'primary' && !item.selected)||(item.color=="warn"&&item.selected)){
          return;
        }
      }
      for(const item of this.technologies){
        if ((item.color == 'primary' && !item.selected)||(item.color=="warn"&&item.selected)){
          return;
        }
      }
      this.objetChanges=false;
    }else{
      for(const item of this.actions){
        if ((item.color == 'primary' && !item.selected)||(item.color=="warn"&&item.selected)){
          this.objetChanges=true;
          break;
        }
      }
      if (this.objetChanges) return;
      for(const item of this.reseaux){
        if ((item.color == 'primary' && !item.selected)||(item.color=="warn"&&item.selected)){
          this.objetChanges=true;
          break;
        }
      }
      if (this.objetChanges) return;
      for(const item of this.technologies){
        if ((item.color == 'primary' && !item.selected)||(item.color=="warn"&&item.selected)){
          this.objetChanges=true;
          break;
        }
      }
    }
  }

  initColor(){
    this.actions.forEach(item => {
      if(!item.selected) item.color='warn';
    });
    this.reseaux.forEach(item => {
      if(!item.selected) item.color='warn';
    });
    this.technologies.forEach(item => {
      if(!item.selected) item.color='warn';
    });
  }

  submitObjetChanges(){
    this.ordreMission$.updateObject(this.ordreMission.sousCategories,this.ordreMission.id).subscribe(detail=>{
      this.initColor();
      this.setSelectedCategorie(detail.sousCategories);
      this.objetChanges=false;
    });
  }

  submitAccompteChanges(){
    const accompte = (this.accompteControl.value) ? this.accompteControl.value : 0;
    const retour = (this.retourControl.value) ? this.retourControl.value : 0;
    this.ordreMission$.updateAccompte(this.ordreMission.id, accompte, retour)
      .subscribe(()=> this.accompteChanges=false);
  }

  submitInfoChanges(){
    const value = this.infoControl.value;
    this.ordreMission$.updateInfo(
      this.ordreMission.id,
      {
        description: (value.description)? value.description:"",
        reclamation: (value.reclamation)? value.reclamation:""}
    ).subscribe(()=>this.infoChanges=false);
  }

  submitEstimationChanges(){
    const value = this. estimationControl.value;
    this.ordreMission$.updateEstimation(
      this.ordreMission.id,
      (value.date)? value.date :null,
      (value.duree)? value.duree : 0
    ).subscribe(()=>this.estimationChanges=false);

  }

  getMaxValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      return (this.accompteControl.value)? (control.value>this.accompteControl.value)? {"valid":false}: null :{"valid":false}
    }

  }

  affecterTechnicien() {
    const affectedTechnicien = this.ordreMission.techniciens.map( tech => tech.id);
    this.technicien.getAll().subscribe(list =>{
      const dialogRef = this.dialog.open(AffectTechnicienDialogComponent,{data: list.filter( tech => affectedTechnicien.findIndex( id => id == tech.id) < 0)});
      dialogRef.afterClosed().subscribe(technicien=>{
        if(technicien) this.ordreMission$.affecter(this.ordreMission.id,technicien.id).subscribe( mission =>{
          if(mission) {
            // vide ou pas
            if (this.ordreMission.techniciens) this.ordreMission.techniciens.push(technicien);
            else this.ordreMission.techniciens=[technicien];
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
        this.deplacement$.create(deplacement,this.ordreMission.id).subscribe(ordreMission=>{
          if(ordreMission){
            if(this.ordreMission.deplacements) this.ordreMission.deplacements.push(deplacement);
            else this.ordreMission.deplacements=[deplacement];
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
      if(model) this.checklist.create(model,this.ordreMission.id).subscribe(cheklist=>{
        if(cheklist) this.ordreMission.checklist = cheklist;
      });
    });
  }

  timeFormat(time:string):string{
    return time?.slice(0,5);
  }

  log(object: any) {
    console.log(object);
  }

}
