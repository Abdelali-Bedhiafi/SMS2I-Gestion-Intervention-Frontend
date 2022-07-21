import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatTable} from '@angular/material/table';
import { AjoutDepenseDialogComponent } from '../ajout-depense-dialog/ajout-depense-dialog.component';
import { Depense } from '../model/depense';
import { CategorieDepenseService } from '../service/categorie-depense.service';
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

  dataSource: {
    depense:Depense,
    controls: {
      valeur: FormControl<number|null>,
      valeurRemboursee: FormControl<number|null>
    },
    change: boolean
  }[]=[];
  displayedColumns: string[] = ['categorie', 'coutUnitaire', 'plafond', 'valeur', 'valeurRemboursee','supprimer','valider'];
  @ViewChild(MatTable) table!: MatTable<Depense>;

  ready=false;
  constructor(private depense$:DepenseService,
              private fb:FormBuilder,
              public dialog: MatDialog,
              private categorie: CategorieDepenseService){};


  ngOnInit(): void {
    this.depense$.getAllByDeplacement(1).subscribe(data=>{
      data.forEach(depense=>{
        const element={
          depense:depense,
          controls: {
            valeur: new FormControl(depense.valeur, Validators.min(0)),
            valeurRemboursee: new FormControl(depense.valeurRemboursee, Validators.min(0))},
          change: false
        }
        element.controls.valeur.valueChanges.subscribe(newValue=>{
          if(newValue != element.depense.valeur) element.change=true;
          else if(element.depense.valeurRemboursee == element.controls.valeurRemboursee.value) element.change=false;
        });
        element.controls.valeurRemboursee.valueChanges.subscribe(newValue=>{
          if(newValue != element.depense.valeurRemboursee) element.change=true;
          else if(element.depense.valeur == element.controls.valeur.value) element.change=false;
        });
        this.dataSource.push(element);
      });
      this.ready=true;
    });
  }



  onSubmit(id: string) {
    // TODO: Use EventEmitter with form value
    //this.depense$.update({id: id, valeur:<number>this.valeurs.value.valeur, valeurRemboursee:<number>this.valeurs.value.valeurRemboursee });
    console.log(id);
    console.log(this.dataSource.filter(value => value.depense.id==id)[0].depense.valeur)
    console.log(this.dataSource.filter(value => value.depense.id==id)[0].depense.valeurRemboursee)
    console.log(this.dataSource.filter(value => value.depense.id==id)[0].controls.valeur.value);
    console.log(this.dataSource.filter(value => value.depense.id==id)[0].controls.valeurRemboursee.value);


  }



  openDialog(): void {
    let exetingCategorie: number[]=[];
    exetingCategorie = this.dataSource.map(i => i.depense.categorieDepences.id);
    this.categorie.categories().subscribe(list=>{
      const dialogRef = this.dialog.open(AjoutDepenseDialogComponent,{data: list.filter(e => exetingCategorie.findIndex(i=>e.id==i) < 0 )});
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.dataSource.push({
            depense:{
              id: "",
              valeur: 0,
              valeurRemboursee: 0,
              categorieDepences: result
            },
            controls: {
              valeur: new FormControl(0),
              valeurRemboursee: new FormControl(0)
            },
            change: false
          });
          this.table.renderRows();
        }
      });
    });

  }


 /*addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push();
    this.table.renderRows();
  }*/

  removeData(element:{depense:Depense, controls: {valeur: FormControl<number|null>,valeurRemboursee: FormControl<number|null>},change:boolean}) {
    const i = this.dataSource.findIndex((data)=>{return data.depense.id==element.depense.id});
    this.dataSource.splice(i,1);
    this.table.renderRows();
  }

/* get valeurs() {
    return this.form.controls["valeurs"] as FormArray;
  }
  get valeursRemboursees() {
    return this.form.controls["valeursRemboursees"] as FormArray;
  }*/
}
