import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {CategorieDepenseService} from "../service/categorie-depense.service";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {CategorieDepense} from "../model/categorie-depense";
import {
  AddCategorieDepenseDialogComponent
} from "../dialog/add-categorie-depense-dialog/add-categorie-depense-dialog.component";
import {
  EditCategorieDepenseDialogComponent
} from "../dialog/edit-categorie-depense-dialog/edit-categorie-depense-dialog.component";

@Component({
  selector: 'app-categorie-depense-list',
  templateUrl: './categorie-depense-list.component.html',
  styleUrls: ['./categorie-depense-list.component.css']
})
export class CategorieDepenseListComponent implements AfterViewInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  categories!: MatTableDataSource<CategorieDepense>;

  constructor(private categorie$: CategorieDepenseService,
              private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.categorie$.getAll().subscribe(list=>{
      this.categories = new MatTableDataSource(list);
      this.categories.paginator= this.paginator;
    });
  }

  add() {
    const dialogRef = this.dialog.open(AddCategorieDepenseDialogComponent);
    dialogRef.afterClosed().subscribe(_c => {
      if(_c){
        this.categorie$.add(_c).subscribe(c =>{
          let data = this.categories.data;
          data.push(c);
          this.categories.data=data;
        });
      }
    });
  }

  edit(categorie: CategorieDepense) {
    const dialogRef = this.dialog.open(EditCategorieDepenseDialogComponent,{data:categorie});
    dialogRef.afterClosed().subscribe(_c =>{
      if(_c){
        this.categorie$.update(_c).subscribe(c=>{
          let data = this.categories.data;
          const i = data.findIndex(m => m.id==categorie.id);
          data.splice(i,1,c);
          this.categories.data=data;
        });
      }
    });
  }

  delete(categorie:CategorieDepense) {
    this.categorie$.delete(categorie).subscribe(()=>{
      let data = this.categories.data;
      const i = data.findIndex(m => m.id==categorie.id);
      data.splice(i,1);
      this.categories.data=data;
    });
  }
}
