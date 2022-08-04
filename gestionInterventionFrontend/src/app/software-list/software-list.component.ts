import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Software} from "../model/software";
import {MatPaginator} from "@angular/material/paginator";
import {SoftwareCategorie} from "../model/software-categorie";
import {SoftwareService} from "../service/software.service";
import {MatDialog} from "@angular/material/dialog";
import {EditSoftwareDialogComponent} from "../dialog/edit-software-dialog/edit-software-dialog.component";
import {AddSoftwareDialogComponent} from "../dialog/add-software-dialog/add-software-dialog.component";

@Component({
  selector: 'app-software-list',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.css']
})
export class SoftwareListComponent implements OnInit,AfterViewInit {

  softwares!: MatTableDataSource<Software>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() categorie!: SoftwareCategorie;

  constructor(private software$: SoftwareService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.softwares = new MatTableDataSource(this.categorie.softwares);
  }

  ngAfterViewInit():void {
    this.softwares.paginator=this.paginator;
  }

  edit(software: Software) {
    const dialogRef = this.dialog.open(EditSoftwareDialogComponent,{data:software});
    dialogRef.afterClosed().subscribe(_s =>{
      if(_s){
        _s.categorie={id:this.categorie.id};
        this.software$.update(_s).subscribe(_software=>{
          let data = this.softwares.data;
          const i = data.findIndex(s => s.id==_software.id);
          data.splice(i,1,_software);
          this.softwares.data=data;
        });
      }
    });
  }

  delete(software: Software) {
    this.software$.delete(software).subscribe(()=>{
      let data = this.softwares.data;
      const i = data.findIndex(s => s.id==software.id);
      data.splice(i,1);
      this.softwares.data=data;
    });
  }

  add() {
    const dialogRef = this.dialog.open(AddSoftwareDialogComponent);
    dialogRef.afterClosed().subscribe(_s =>{
      if(_s){
        _s.categorie={id:this.categorie.id};
        this.software$.add(_s).subscribe(_software=>{
          let data = this.softwares.data;
          data.push(_software);
          this.softwares.data=data;
        });
      }
    });
  }
}
