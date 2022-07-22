import { Component, OnInit, ViewChild} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { AjoutDepenseDialogComponent } from '../ajout-depense-dialog/ajout-depense-dialog.component';
import { Depense } from '../model/depense';
import { CategorieDepenseService } from '../service/categorie-depense.service';
import { DepenseService } from '../service/depense.service';
import {ActivatedRoute} from "@angular/router";

export interface DataSourceElement {
  depense: Depense,
  controls: FormGroup<{
    valeur: FormControl<number|null>,
    valeurRemboursee: FormControl<number|null>
  }>,
  change: boolean
}



@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent implements OnInit{


  dataSource!: DataSourceElement[];
  @ViewChild(MatTable) table!: MatTable<DataSourceElement>;

  displayedColumns: string[] = ['categorie', 'coutUnitaire', 'plafond', 'valeur', 'valeurRemboursee','supprimer','valider'];
  id!: number;
  ready=false;

  constructor(private depense$:DepenseService,
              private fb:FormBuilder,
              public dialog: MatDialog,
              private categorie: CategorieDepenseService,
              private route: ActivatedRoute){ }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.id = Number.parseInt(<string>params.get("id"));
      this.depense$.getAllByDeplacement(this.id).subscribe(data=>{
        this.dataSource = data.map(depense=>{
          const element =  {
            depense: depense,
            controls: new FormGroup({
              valeur : new FormControl<number | null>(depense.valeur,Validators.min(0)),
              valeurRemboursee : new FormControl<number | null>(depense.valeurRemboursee,Validators.min(0))
            },this.getMaxValidator()),
            change: false
          };
          element.controls.valueChanges.subscribe(value =>{
            element.change=!(value.valeur == element.depense.valeur && value.valeurRemboursee == element.depense.valeurRemboursee);
          });
          return element;
        });

        this.ready=true;
      });
    });
  }


  getMaxValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      const valeur = control.get("valeur");
      const valeurRemboursee = control.get("valeurRemboursee");
      if(valeurRemboursee?.value){
        if(valeur?.value){
          return (valeur.value<valeurRemboursee.value)? {"valid": false} : null;
        } return {"valid": false};
      } return null;
    }
  }


  onSubmit(element: DataSourceElement) {
    const value = element.controls.value;
    const depense: Depense = {
      id: element.depense.id,
      valeur: (value.valeur)? value.valeur : 0,
      valeurRemboursee: (value.valeurRemboursee)? value.valeurRemboursee : 0,
      categorieDepences: element.depense.categorieDepences
    }
    if(depense.id=='') this.depense$.add(depense,this.id).subscribe(()=> element.change=false);
    else this.depense$.update(depense).subscribe(()=> element.change=false);
  }



  openDialog(): void {
    const existingCategorie = this.dataSource.map(i => i.depense.categorieDepences.id);
    this.categorie.categories().subscribe(list=>{
      const dialogRef = this.dialog.open(AjoutDepenseDialogComponent,{data: list.filter(e => existingCategorie.findIndex(i=>e.id==i) < 0 )});
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          const element = {
            depense:{
              id: "",
              valeur: 0,
              valeurRemboursee: 0,
              categorieDepences: result
            },
            controls: new FormGroup({
              valeur: new FormControl(0,{validators: Validators.min(0)}),
              valeurRemboursee: new FormControl(0,Validators.min(0))
            }, this.getMaxValidator()),
            change: false
          };
          element.controls.valueChanges.subscribe(value => {
            element.change=!(value.valeur == element.depense.valeur && value.valeurRemboursee == element.depense.valeurRemboursee);
          });
          this.dataSource.push(element);
          this.table.renderRows();
        }
      });
    });

  }



  removeData(i:number) {
    const element=this.dataSource.splice(i,1)[0];
    if(element.depense.id!='') this.depense$.delete(element.depense.id).subscribe(()=>this.table.renderRows())
    else this.table.renderRows();
  }



/* get valeurs() {
    return this.form.controls["valeurs"] as FormArray;
  }
  get valeursRemboursees() {
    return this.form.controls["valeursRemboursees"] as FormArray;
  }*/
  /*form = this.fb.group({
  valeurs: this.fb.array([]),
  valeursRemboursees: this.fb.array([])
});



valeurs= new FormGroup({
  valeur: new FormControl<number>(0),
  valeurRemboursee: new FormControl<number>(0),
});*/

  /*addData() {
     const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
     this.dataSource.push();
     this.table.renderRows();
   }*/
}
