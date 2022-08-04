import { Component, OnInit } from '@angular/core';
import {SoftwareCategorie} from "../model/software-categorie";
import {SoftwareCategorieService} from "../service/software-categorie.service";
import {MatDialog} from "@angular/material/dialog";
import {
  EditSoftwareCategorieDialogComponent
} from "../dialog/edit-software-categorie-dialog/edit-software-categorie-dialog.component";
import {
  AddSoftwareCategorieDialogComponent
} from "../dialog/add-software-categorie-dialog/add-software-categorie-dialog.component";

@Component({
  selector: 'app-software-categorie-list',
  templateUrl: './software-categorie-list.component.html',
  styleUrls: ['./software-categorie-list.component.css']
})
export class SoftwareCategorieListComponent implements OnInit {
  categories!: SoftwareCategorie[];

  constructor(private categorie$: SoftwareCategorieService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.categorie$.getAll().subscribe(list=>{
      this.categories=list;
    });
  }


  edit(categorie: SoftwareCategorie) {
    const dialogRef = this.dialog.open(EditSoftwareCategorieDialogComponent,{data:categorie});
    dialogRef.afterClosed().subscribe(_c=>{
      if(_c){
        this.categorie$.update(_c).subscribe(c =>{
          categorie.nom=c.nom;
        });
      }
    });
  }

  delete(categorie: SoftwareCategorie) {
    this.categorie$.delete(categorie).subscribe(()=>{
      const i =this.categories.findIndex(c => c.id==categorie.id);
      this.categories.splice(i,1);
    });
  }

  add() {
    const dialogRef = this.dialog.open(AddSoftwareCategorieDialogComponent);
    dialogRef.afterClosed().subscribe(_c=> {
      if (_c) {
        this.categorie$.add(_c).subscribe(c => {
          c.softwares = [];
          this.categories.push(c);
        });
      }
    });
  }
}
