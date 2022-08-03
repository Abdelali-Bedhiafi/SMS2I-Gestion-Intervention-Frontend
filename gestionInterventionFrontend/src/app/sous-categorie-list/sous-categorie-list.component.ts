import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {SousCategorieService} from "../service/sous-categorie.service";
import {MatTableDataSource} from "@angular/material/table";
import {SousCategorie} from "../model/sous-categorie";
import {Categorie} from "../model/categorie";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {AddSousCategorieDialogComponent} from "../dialog/add-sous-categorie-dialog/add-sous-categorie-dialog.component";
import {
  EditSousCategorieDialogComponent
} from "../dialog/edit-sous-categorie-dialog/edit-sous-categorie-dialog.component";


@Component({
  selector: 'app-sous-categorie-list',
  templateUrl: './sous-categorie-list.component.html',
  styleUrls: ['./sous-categorie-list.component.css']
})
export class SousCategorieListComponent implements AfterViewInit {

  categories!: MatTableDataSource<SousCategorie>;
  @Input() categorie!: Categorie;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private categorie$: SousCategorieService,
              private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.categorie$.getAllByCategorie(this.categorie).subscribe(list =>{
      this.categories = new MatTableDataSource(list);
      this.categories.paginator = this.paginator;
    });
  }


  add(){
    const dialogRef = this.dialog.open(AddSousCategorieDialogComponent,{data:this.categorie.split('_')[0].toLowerCase()});
    dialogRef.afterClosed().subscribe(data=> {
      if (data) {
        const body: SousCategorie = {
          id: 0,
          titre: data.titre,
          description: data.description,
          categorie: this.categorie
        };
        this.categorie$.add(body)
          .subscribe(c => {
          let data = this.categories.data;
          data.push(c);
          this.categories.data = data;
          });
      }
    });
  }

  edit(categorie: SousCategorie) {
    const dialogRef = this.dialog.open(EditSousCategorieDialogComponent,{data:categorie});
    dialogRef.afterClosed().subscribe(data=> {
      if (data) {
        const body: SousCategorie = {
          id: categorie.id,
          titre: data.titre,
          description: data.description,
          categorie: this.categorie
        };
        this.categorie$.update(body).subscribe(c =>{
          let data = this.categories.data;
          const i = data.findIndex(i => i.id==c.id);
          data.splice(i,1,c);
          this.categories.data=data;
        });
      }
    });
  }

  delete(categorie: SousCategorie) {
    this.categorie$.delete(categorie).subscribe( ()=>{
      let data = this.categories.data;
      const i = data.findIndex(i => i.id==categorie.id);
      data.splice(i,1);
      this.categories.data=data;
    });
  }
}


