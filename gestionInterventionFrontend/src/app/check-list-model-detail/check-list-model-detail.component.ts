import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CheckListModel} from "../model/check-list-model";
import {CheckListModelService} from "../service/check-list-model.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Materiel} from "../model/materiel";
import {Software} from "../model/software";
import {SoftwareCategorie} from "../model/software-categorie";
import {MatDialog} from "@angular/material/dialog";
import {SoftwareCategorieService} from "../service/software-categorie.service";
import {MaterielService} from "../service/materiel.service";
import {SoftwareService} from "../service/software.service";
import {AjoutMaterielDialogComponent} from "../dialog/ajout-materiel-dialog/ajout-materiel-dialog.component";
import {AjoutSoftwareDialogComponent} from "../dialog/ajout-software-dialog/ajout-software-dialog.component";
import {
  AjoutSoftwareCategorieDialogComponent
} from "../dialog/ajout-software-categorie-dialog/ajout-software-categorie-dialog.component";

@Component({
  selector: 'app-check-list-model-detail',
  templateUrl: './check-list-model-detail.component.html',
  styleUrls: ['./check-list-model-detail.component.css']
})
export class CheckListModelDetailComponent implements OnInit {

  modelControl!: FormGroup<{
    id: FormControl<number>,
    nom: FormControl<string>,
    materiels: FormControl<Materiel[]>,
    softwares: FormControl<Software[]>,
    softwareCategories: FormControl<SoftwareCategorie[]>
  }>;

  model!: CheckListModel;
  changes=false;
  ready=false;
  constructor(private model$: CheckListModelService,
              private categorie$: SoftwareCategorieService,
              private materiel$: MaterielService,
              private software$: SoftwareService,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param=>{
      const id = Number(param.get('id'));
      this.model$.getById(id).subscribe(m =>{
        this.model=m;
        console.log(m)
        this.modelControl = new FormGroup({
          id: new FormControl(id,{nonNullable:true,validators: Validators.required}),
          nom: new FormControl(m.nom,{nonNullable:true, validators: Validators.required}),
          materiels: new FormControl(m.materiels.map(m=>m),{nonNullable:true}),
          softwares: new FormControl(m.softwares.map(s=>s),{nonNullable:true}),
          softwareCategories: new FormControl(m.softwareCategories.map(c=>c),{nonNullable:true})
        });
        this.modelControl.valueChanges.subscribe(value=>{
          this.changes = (value.nom!=this.model.nom
            || value.materiels!=this.model.materiels
            || value.softwares!=this.model.softwares
            || value.softwareCategories!= this.model.softwareCategories);
        });
        this.ready=true;
      });
    });
  }

  update(){
    this.model$.update(<CheckListModel>this.modelControl.value).subscribe(model=>{
      this.changes=false;
      this.model=model;
    });
  }

  addMaterial() {
    this.materiel$.getAll().subscribe(list=>{
      let materiels = this.modelControl.controls.materiels.value;
      const dialogRef = this.dialog.open(AjoutMaterielDialogComponent,{
        data: list.filter( m => materiels.findIndex( i => i.id == m.id)<0)
      });
      dialogRef.afterClosed().subscribe( m => {
        if (m){
          materiels.push(m);
          this.modelControl.controls.materiels.setValue(materiels);
        }
      });
    });
  }

  addSoftware() {
    this.software$.getAll().subscribe(list=>{
      let softwares = this.modelControl.controls.softwares.value;
      const dialogRef = this.dialog.open(AjoutSoftwareDialogComponent,{
        data: list.filter( s =>softwares.findIndex( i => i.id == s.id)<0)
      });
      dialogRef.afterClosed().subscribe( s => {
        if (s){
          softwares.push(s);
          this.modelControl.controls.softwares.setValue(softwares);
        }
      });
    });
  }

  addCategorie() {
    this.categorie$.getAll().subscribe(list=>{
      let categories = this.modelControl.controls.softwareCategories.value;
      const dialogRef = this.dialog.open(AjoutSoftwareCategorieDialogComponent,{
        data: list.filter(c =>categories.findIndex( i => i.id == c.id)<0)
      });
      dialogRef.afterClosed().subscribe( c => {
        if (c){
          categories.push(c);
          this.modelControl.controls.softwareCategories.setValue(categories);
        }
      });
    });
  }

  deleteMateriel(material: Materiel) {
    let materiels = this.modelControl.controls.materiels.value;
    const i = materiels.findIndex(m => m.id == material.id);
    materiels.splice(i,1);
    this.modelControl.controls.materiels.setValue(materiels);
  }

  deleteSoftware(software: Software) {
    let softwares = this.modelControl.controls.softwares.value;
    const i = softwares.findIndex(s => s.id == software.id);
    softwares.splice(i,1);
    this.modelControl.controls.softwares.setValue(softwares);
  }

  deleteCategorie(categorie: SoftwareCategorie) {
    let categories = this.modelControl.controls.softwareCategories.value;
    const i = categories.findIndex(s => s.id == categorie.id);
    categories.splice(i,1);
    this.modelControl.controls.softwareCategories.setValue(categories);
  }
}
