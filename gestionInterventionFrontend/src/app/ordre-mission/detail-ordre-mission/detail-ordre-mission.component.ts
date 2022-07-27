import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable, startWith} from "rxjs";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ThemePalette} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";


import {SousCategorie} from "../../model/sous-categorie";
import {Deplacement} from "../model/deplacement";
import {OrdreMissionDetail} from "../model/ordre-mission-detail";
import {EtatOrdreMission} from "../../model/etat-ordre-mission";

import {AffectTechnicienDialogComponent} from "../affect-technicien-dialog/affect-technicien-dialog.component";
import {CreateDeplacementDialogComponent} from "../create-deplacement-dialog/create-deplacement-dialog.component";
import {EditDeplacementDialogComponent} from "../edit-deplacement-dialog/edit-deplacement-dialog.component";
import {
  SelectCheckListModelDialogComponent
} from "../select-check-list-model-dialog/select-check-list-model-dialog.component";
import {AddSousCategorieDialogComponent} from "../../add-sous-categorie-dialog/add-sous-categorie-dialog.component";

import {OrdreMissionService} from "../service/ordre-mission.service";
import {SousCategorieService} from "../../service/sous-categorie.service";
import {DeplacementService} from "../service/deplacement.service";
import {CheckListService} from "../../service/check-list.service";
import {TechnicienService} from "../../service/technicien.service";
import {BonInterventionService} from "../../service/bon-intervention.service";

import {getMaxValidator} from "../../app.component";
import {Categorie} from "../../model/categorie";


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
  keywords: SousCategorieData[]=[];
  technologies: SousCategorieData[]=[];

  actionSelectControl = new FormControl();
  keywordSelectControl = new FormControl();
  technologieSelectControl = new FormControl();
  accompteControl!: FormGroup<{accompte: FormControl<number|null>, retour: FormControl<number|null> }>;
  estimationControl!: FormGroup<{date: FormControl<Date|null>, duree: FormControl<number|null>}>;
  infoControl!: FormGroup<{description: FormControl<string|null>, reclamation: FormControl<string|null>}>;
  designationControl!: FormControl<string|null>;

  filteredActions!: Observable<SousCategorieData[]>;
  filteredKeywords!: Observable<SousCategorieData[]>;
  filteredTechnologies!: Observable<SousCategorieData[]>;

  actionReady!: Promise<boolean>;
  keywordReady!: Promise<boolean>;
  technologieReady!: Promise<boolean>;

  ready = false;
  objetChanges = false;
  accompteChanges = false;
  estimationChanges = false;
  infoChanges = false;
  designationChanges= false;

  root_path!: string;

  bonSortieEmpty=true;
  bonRetourEmpty=true;
  ordreMissionEmpty=true;


  categorie = Categorie
  constructor(private route: ActivatedRoute,
              private ordreMission$: OrdreMissionService,
              private deplacement$: DeplacementService,
              private checklist: CheckListService,
              private technicien: TechnicienService,
              private sousCategorie: SousCategorieService,
              private bonIntervention: BonInterventionService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllSousCategorie();
    this.root_path= this.ordreMission$.getRootPath();
    this.route.paramMap.subscribe(params=>{
      const id = Number.parseInt(<string>params.get("id"));
      this.ordreMission$.checkFiles(id).subscribe(list =>{
        this.bonSortieEmpty=!list[0];
        this.bonRetourEmpty=!list[1];
        this.ordreMissionEmpty=!list[3];
      });
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
    this.actionReady.then(()=>{
      this.filteredActions = this.actionSelectControl.valueChanges.pipe(
        startWith<string>('') ,
        map(value=> typeof value === 'string' ? value : ''),
        map(filter => this.filter(this.actions,filter))
      );
    });
    this.keywordReady.then(()=>{
      this.filteredKeywords = this.keywordSelectControl.valueChanges.pipe(
        startWith<string>(''),
        map(value=> typeof value === 'string' ? value : ''),
        map(filter => this.filter(this.keywords,filter))
      );
    });
    this.technologieReady.then(()=>{
      this.filteredTechnologies = this.technologieSelectControl.valueChanges.pipe(
        startWith<string>(''),
        map(value=> typeof value === 'string' ? value : ''),
        map(filter => this.filter(this.technologies,filter))
      );
    });
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

  getAllSousCategorie(){
    this.actionReady= new Promise<boolean>((resolve)=>{
      this.sousCategorie.getAllByCategorie(Categorie.ACTION_ORDRE).subscribe( data =>{
        data.forEach(sousCategorie => this.actions.push({sousCategorie: sousCategorie, selected: false, color: 'warn'}));
        resolve(true);
      });
    });
    this.keywordReady= new Promise<boolean>((resolve)=>{
      this.sousCategorie.getAllByCategorie(Categorie.KEYWORDS).subscribe( data =>{
        data.forEach(sousCategorie => this.keywords.push({sousCategorie: sousCategorie, selected: false, color: 'warn'}));
        resolve(true);
      });
    });
    this.technologieReady= new Promise<boolean>((resolve)=>{
      this.sousCategorie.getAllByCategorie(Categorie.TECHNOLOGIE).subscribe( data =>{
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
    this.keywordReady.then(()=>{
      this.keywords.forEach(item=>{
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
      for(const item of this.keywords){
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
      for(const item of this.keywords){
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
    this.keywords.forEach(item => {
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
    const value= this.accompteControl.value;
    this.ordreMission$.updateAccompte(this.ordreMission.id, (value.accompte)? value.accompte:0, (value.retour)? value.retour:0)
      .subscribe(ordre =>{
        this.accompteChanges=false;
        this.ordreMission.etat = ordre.etat;
      });
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
    const designation = (this.designationControl.value)? this.designationControl.value : ''
    this.ordreMission$.updateDesignation(this.ordreMission.id, designation).subscribe(
      () => this.designationChanges = false
    );
  }

  addCategorie(categorie: Categorie){
    const dialogRef = this.dialog.open(AddSousCategorieDialogComponent,{data:categorie.split('_')[0].toLowerCase()});
    dialogRef.afterClosed().subscribe(data=> {
      if (data) {
        const body: SousCategorie={
          id:0,
          titre: data.titre,
          description: data.description,
          categorie: categorie
        };
        this.sousCategorie.add(body).subscribe(s => {
          switch (categorie) {
            case Categorie.ACTION_ORDRE:
              this.actions.push({sousCategorie: s, selected: false, color: "warn"});
              break;
            case Categorie.TECHNOLOGIE:
              this.technologies.push({sousCategorie: s, selected: false, color: "warn"});
              break;
            case Categorie.KEYWORDS:
              this.keywords.push({sousCategorie: s, selected: false, color: "warn"});
              break;
          }
        });
      }
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
}
