import { Component, OnInit } from '@angular/core';
import {CheckList} from "../model/check-list";
import {Software} from "../model/software";
import {FormControl, Validators} from "@angular/forms";
import {CheckListService} from "../service/check-list.service";
import {SoftwareCategorieService} from "../service/software-categorie.service";
import {ActivatedRoute} from "@angular/router";
import {Materiel} from "../model/materiel";
import {MatDialog} from "@angular/material/dialog";
import {AjoutMaterielDialogComponent} from "../dialog/ajout-materiel-dialog/ajout-materiel-dialog.component";
import {MaterielService} from "../service/materiel.service";
import {SoftwareService} from "../service/software.service";
import {AjoutSoftwareDialogComponent} from "../dialog/ajout-software-dialog/ajout-software-dialog.component";



@Component({
  selector: 'app-check-list-detail',
  templateUrl: './check-list-detail.component.html',
  styleUrls: ['./check-list-detail.component.css']
})
export class CheckListDetailComponent implements OnInit {

  checklist!: CheckList;
  uncheckedCategorie!: {categorie: string, softwares:Software[], input:FormControl<Software|null>}[];

  ready= false;

  constructor(private checkList$: CheckListService,
              private categorie$: SoftwareCategorieService,
              private materiel$: MaterielService,
              private software$: SoftwareService,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      let id = Number.parseInt(<string>params.get("id"));
      this.checkList$.getById(id).subscribe(checklist=>{
        this.checklist=checklist;
        this.checkCategorie();
        this.ready=true;
      });
    })

  }
  checkCategorie() {
    this.uncheckedCategorie = this.checklist.model.softwareCategories
      .filter( categorie =>
        this.checklist.softwares.findIndex(software =>
          software.categorie== categorie.nom) < 0)
      .map(categorie => {
        const allowedSoftware = categorie.softwares.filter(software => this.checklist.model.softwares.findIndex(s => s.id == software.id ) < 0);
        return {
          categorie: categorie.nom,
          softwares: allowedSoftware,
          input: new FormControl(allowedSoftware[0],{validators: Validators.required})
        }
      });
  }

  addToChecklist(control?: FormControl<Software>, materiel?: Materiel, software?: Software) {
    const checklistClone: CheckList = {
      id: this.checklist.id,
      softwares: this.checklist.softwares.map(s => s),
      materiels: this.checklist.materiels.map(m => m),
      model: this.checklist.model,
      ordreMission: this.checklist.ordreMission
    };
    if (control) checklistClone.softwares.push(control.value);
    else if (materiel) checklistClone.materiels.push(materiel);
    else if (software) checklistClone.softwares.push(software)
    this.checkList$.update(checklistClone.id,checklistClone)
      .subscribe(() => this.checklist=checklistClone);
  }

  removeFromChecklist(materiel?: Materiel, software?: Software){
    const softwares = this.checklist.softwares.map(s=>s);
    const materiels = this.checklist.materiels.map(m=>m);
    const checklistClone: CheckList = {
      id: this.checklist.id,
      softwares: (software)? softwares.filter(s => s.id!=software.id):softwares,
      materiels: (materiel)? materiels.filter(m => m.id!=materiel.id):materiels,
      model: this.checklist.model,
      ordreMission: this.checklist.ordreMission
    };
    return new Promise<void>((resolve)=>{
      this.checkList$.update(checklistClone.id,checklistClone)
        .subscribe(()=> {
          this.checklist=checklistClone;
          resolve();
        });
    });

  }



  addMaterial():void{
    this.materiel$.getAll().subscribe(list=>{
      const dialogRef = this.dialog.open(AjoutMaterielDialogComponent,{
        data: list
          .filter( m => this.checklist.materiels.findIndex( i => i.id == m.id)<0)
          .filter( m => this.checklist.model.materiels.findIndex(i => i.id== m.id)<0)
      });
      dialogRef.afterClosed().subscribe( m => {
        if (m) this.addToChecklist(undefined,m);
      });
    });
  }

  addSoftware():void{
    this.software$.getAll().subscribe(list=>{
      const dialogRef = this.dialog.open(AjoutSoftwareDialogComponent,{
        data: list
          .filter( s => this.checklist.softwares.findIndex( i => i.id == s.id)<0)
          .filter( s => this.checklist.model.softwares.findIndex(i => i.id == s.id)<0)
      });
      dialogRef.afterClosed().subscribe( m => {
        if (m) this.addToChecklist(undefined,undefined,m);
      });
    });
  }

  selectSoftware(control: FormControl):void{
    const index = this.uncheckedCategorie.findIndex(c => c.input == control);
    this.uncheckedCategorie.splice(index,1);
    this.addToChecklist(control);
  }


  deleteMateriel(materiel: Materiel){
    this.removeFromChecklist(materiel).then();
  }

  deleteSoftware(software: Software){
    this.removeFromChecklist(undefined,software).then(()=> this.checkCategorie());

  }
}


