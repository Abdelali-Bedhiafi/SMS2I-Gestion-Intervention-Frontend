import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Materiel} from "../model/materiel";
import {MaterielService} from "../service/materiel.service";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {AddMaterielDialogComponent} from "../dialog/add-materiel-dialog/add-materiel-dialog.component";
import {EditMaterielDialogComponent} from "../dialog/edit-materiel-dialog/edit-materiel-dialog.component";

@Component({
  selector: 'app-materiel-list',
  templateUrl: './materiel-list.component.html',
  styleUrls: ['./materiel-list.component.css']
})
export class MaterielListComponent implements AfterViewInit {

  materiels!: MatTableDataSource<Materiel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private materiel$: MaterielService,
              private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.materiel$.getAll().subscribe(list=>{
      this.materiels= new MatTableDataSource(list);
      this.materiels.paginator=this.paginator;
    });
  }

  add() {
    const dialogRef = this.dialog.open(AddMaterielDialogComponent);
    dialogRef.afterClosed().subscribe(_m => {
      if(_m){
        this.materiel$.add(_m).subscribe(m =>{
          let data = this.materiels.data;
          data.push(m);
          this.materiels.data=data;
        });
      }
    });
  }

  delete(materiel: Materiel) {
    this.materiel$.delete(materiel).subscribe(()=>{
      let data = this.materiels.data;
      const i = data.findIndex(m => m.id==materiel.id);
      data.splice(i,1);
      this.materiels.data=data;
    });
  }

  edit(materiel: Materiel) {
    const dialogRef = this.dialog.open(EditMaterielDialogComponent,{data:materiel});
    dialogRef.afterClosed().subscribe(_m =>{
      if(_m){
        this.materiel$.update(_m).subscribe(m=>{
          let data = this.materiels.data;
          const i = data.findIndex(m => m.id==materiel.id);
          data.splice(i,1,m);
          this.materiels.data=data;
        });
      }
    });
  }
}
