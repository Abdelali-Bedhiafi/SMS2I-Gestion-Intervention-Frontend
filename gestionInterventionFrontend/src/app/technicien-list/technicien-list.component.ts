import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Technicien} from "../model/technicien";
import {TechnicienService} from "../service/technicien.service";

import {MatDialog} from "@angular/material/dialog";
import {AddTechnicienDialogComponent} from "../dialog/add-technicien-dialog/add-technicien-dialog.component";
import {EditTechnicienDialogComponent} from "../dialog/edit-technicien-dialog/edit-technicien-dialog.component";

@Component({
  selector: 'app-technicien-list',
  templateUrl: './technicien-list.component.html',
  styleUrls: ['./technicien-list.component.css']
})
export class TechnicienListComponent implements AfterViewInit {

  techniciens!: MatTableDataSource<Technicien>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tech$: TechnicienService,
              private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.tech$.getAll().subscribe(list =>{
      this.techniciens = new MatTableDataSource(list);
      this.techniciens.paginator=this.paginator;
    });
  }


  edit(technicien: Technicien) {
    const dialogRef = this.dialog.open(EditTechnicienDialogComponent,{data: technicien});
    dialogRef.afterClosed().subscribe( _tech => {
      this.tech$.update(_tech).subscribe(tech =>{
        let data =this.techniciens.data;
        const i = data.findIndex(i => i.id==tech.id);
        data.splice(i,1,tech);
        this.techniciens.data=data;
      });
    });

  }

  add() {
    const dialogRef = this.dialog.open(AddTechnicienDialogComponent);
    dialogRef.afterClosed().subscribe(technicien=>{
      if(technicien){
        this.tech$.add({id:0, nom: technicien.nom, prenom: technicien.prenom}).subscribe(tech=>{
          let data =this.techniciens.data;
          data.push(tech);
          this.techniciens.data=data;
        });
      }
    });
  }
}
