import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatTable} from '@angular/material/table';
import { AjoutDepenseDialogComponent } from '../ajout-depense-dialog/ajout-depense-dialog.component';
import { Depense } from '../model/depense';
import { DepenseService } from '../service/depense.service';
2
3



@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent implements OnInit {

  /*form = this.fb.group({
    valeurs: this.fb.array([]),
    valeursRemboursees: this.fb.array([])
});



  valeurs= new FormGroup({
    valeur: new FormControl<number>(0),
    valeurRemboursee: new FormControl<number>(0),
  });*/

  dataSource: {depense:Depense, controls: {valeur: FormControl<number|null>,valeurRemboursee: FormControl<number|null>}}[]=[];
  displayedColumns: string[] = ['categorie', 'coutUnitaire', 'plafond', 'valeur', 'valeurRemboursee','supprimer','valider'];
  @ViewChild(MatTable) table!: MatTable<Depense>;

  ready=false;
  constructor(private depense$:DepenseService,
              private fb:FormBuilder,
              public dialog: MatDialog){};


  ngOnInit(): void {
    this.depense$.getAll().subscribe(data=>{
      data.forEach(depense=>{
        this.dataSource.push({depense:depense,controls: {valeur: new FormControl(depense.valeur),valeurRemboursee: new FormControl<number>(depense.valeurRemboursee)}});
      });
      this.ready=true;
    });
  }



  onSubmit(id: string) {
    // TODO: Use EventEmitter with form value
    //this.depense$.update({id: id, valeur:<number>this.valeurs.value.valeur, valeurRemboursee:<number>this.valeurs.value.valeurRemboursee });
    console.log(id);
    console.log(this.dataSource.filter(value => value.depense.id==id)[0].controls.valeurRemboursee.value);
    console.log(this.dataSource.filter(value => value.depense.id==id)[0].depense.valeurRemboursee)
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(AjoutDepenseDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.dataSource
    });
  }

 /*addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push();
    this.table.renderRows();
  }*/

  /*removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }*/

/* get valeurs() {
    return this.form.controls["valeurs"] as FormArray;
  }
  get valeursRemboursees() {
    return this.form.controls["valeursRemboursees"] as FormArray;
  }*/
}
