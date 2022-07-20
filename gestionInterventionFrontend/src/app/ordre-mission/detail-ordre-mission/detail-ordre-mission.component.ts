import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrdreMissionService} from "../service/ordre-mission.service";
import {OrdreMissionDetail} from "../model/ordre-mission-detail";
import {map, Observable, startWith} from "rxjs";
import {SousCategorie} from "../../model/sous-categorie";
import {SousCategorieService} from "../../service/sous-categorie.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ThemePalette} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {AffectTechnicienDialogComponent} from "../affect-technicien-dialog/affect-technicien-dialog.component";
import {CreateDeplacementDialogComponent} from "../create-deplacement-dialog/create-deplacement-dialog.component";
import {Deplacement} from "../model/deplacement";
import {EditDeplacementDialogComponent} from "../edit-deplacement-dialog/edit-deplacement-dialog.component";
import {DeplacementService} from "../service/deplacement.service";
import {SelectCheckListModelComponent} from "../select-check-list-model/select-check-list-model.component";

import {CheckListService} from "../../service/check-list.service";

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
  estimationControl!: FormGroup<{date: FormControl<Date|null>,duree: FormControl<number|null>}>;


  filteredActions: Observable<SousCategorieData[]>;
  filteredReseaux: Observable<SousCategorieData[]>;
  filteredTechnologies: Observable<SousCategorieData[]>;

  actionReady!: Promise<boolean>;
  reseauReady!: Promise<boolean>;
  technologieReady!: Promise<boolean>;

  ready = false;
  objetChanges = false;
  accompteChanges = false;
  estimationchanges = false;
  infoChanges = false;

  constructor(private route: ActivatedRoute,
              private ordreMission$: OrdreMissionService,
              private objet$: SousCategorieService,
              private deplacement$: DeplacementService,
              private checklist: CheckListService,
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
      let id = Number.parseInt(<string>params.get("id"));
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
    this.retourControl = new FormControl(ordre.retourAccompte,[Validators.min(0), Validators.max(ordre.accompteMission)]);
    this.estimationControl = new FormGroup({
      date: new FormControl(ordre.dateDebutEstime),
      duree: new FormControl(ordre.dureeEstime)
    });
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
    this.estimationControl.valueChanges.subscribe(value => {
      if(value.date != this.ordreMission.dateDebutEstime || value.duree != this.ordreMission.dureeEstime) this.estimationchanges = true;
      else this.estimationchanges = false;
    })
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
    if(this.retourControl.valid && this.accompteControl.valid){
      const accompte = (this.accompteControl.value) ? this.accompteControl.value : 0;
      const retour = (this.retourControl.value) ? this.retourControl.value : 0;
      this.ordreMission$.updateAccompte(this.ordreMission.id, accompte, retour)
        .subscribe(()=> this.accompteChanges=false);
    }
  }

  changeMax() {
    this.retourControl.clearValidators();
    this.retourControl.addValidators(Validators.min(0));
    this.retourControl.addValidators(Validators.max(<number>this.accompteControl.value));
    this.retourControl.updateValueAndValidity({emitEvent:false});
  }

  affecterTechnicien() {
    const dialogRef = this.dialog.open(AffectTechnicienDialogComponent);
    dialogRef.afterClosed().subscribe(technicien=>{
      if(technicien) this.ordreMission$.affecter(this.ordreMission.id,technicien.id).subscribe( mission =>{
        if(mission) {
          // vide ou pas
           if (this.ordreMission.techniciens) this.ordreMission.techniciens.push(technicien);
           else this.ordreMission.techniciens=[technicien];
        }
      });
    });
  }

  ajouterDeplacement() {
    const dialogRef = this.dialog.open(CreateDeplacementDialogComponent);
    dialogRef.afterClosed().subscribe(data=>{
      let deplacement: Deplacement ={
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
    });
  }

  editDeplacement(deplacement: Deplacement) {
    const dialogRef = this.dialog.open(EditDeplacementDialogComponent,{data:deplacement});
    dialogRef.afterClosed().subscribe(data=>{
      let body: Deplacement ={
        id: deplacement.id,
        date: data.date,
        heureDebut: data.heureDebut,
        heureFin: data.heureFin
      };
      this.deplacement$.update(body).subscribe(d=>{
        if(d) deplacement=d;
      })
    });
  }

  timeFormat(time:string):string{
    return time?.slice(0,5);
  }

  log(object: any) {
    console.log(object);
  }

  selectChecklistModel() {
    const dialogRef = this.dialog.open(SelectCheckListModelComponent);
    dialogRef.afterClosed().subscribe(model=>{
      if(model) this.checklist.create(model,this.ordreMission.id).subscribe(cheklist=>{
            if(cheklist) this.ordreMission.checklist = cheklist;
        });
    });
  }
}
