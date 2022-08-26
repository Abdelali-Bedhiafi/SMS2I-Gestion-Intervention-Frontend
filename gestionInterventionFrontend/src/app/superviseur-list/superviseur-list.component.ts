import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Superviseur} from "../model/superviseur";
import {SuperviseurService} from "../service/superviseur.service";
import {MatDialog} from "@angular/material/dialog";
import {EditSuperviseurDialogComponent} from "../dialog/edit-superviseur-dialog/edit-superviseur-dialog.component";
import {AddSuperviseurDialogComponent} from "../dialog/add-superviseur-dialog/add-superviseur-dialog.component";

@Component({
  selector: 'app-superviseur-list',
  templateUrl: './superviseur-list.component.html',
  styleUrls: ['./superviseur-list.component.css']
})
export class SuperviseurListComponent implements AfterViewInit {
  superviseurs!: MatTableDataSource<Superviseur>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sup$: SuperviseurService,
              private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.sup$.getAll().subscribe(list => {
      this.superviseurs = new MatTableDataSource(list);
      this.superviseurs.paginator=this.paginator;
    });
  }

  edit(superviseur: Superviseur) {
    const dialogRef = this.dialog.open(EditSuperviseurDialogComponent,{data:superviseur});
    dialogRef.afterClosed().subscribe( _superviseur =>{
      this.sup$.update(_superviseur).subscribe(sup => {
        let data  = this.superviseurs.data;
        const i = data.findIndex(i => i.id==sup.id);
        data.splice(i,1,sup);
        this.superviseurs.data=data;
      });
    });
  }

  add() {
    const dialogRef = this.dialog.open(AddSuperviseurDialogComponent);
    dialogRef.afterClosed().subscribe(superviseur=>{
      if(superviseur){
        this.sup$.add({id:0, nom: superviseur.nom, prenom: superviseur.prenom, password: superviseur.password}).subscribe(sup=>{
          let data =this.superviseurs.data;
          data.push(sup);
          this.superviseurs.data=data;
        });
      }
    });
  }


}
