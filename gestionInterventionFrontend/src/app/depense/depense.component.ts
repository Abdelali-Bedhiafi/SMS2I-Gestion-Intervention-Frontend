import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MatTable} from '@angular/material/table';
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

  form = this.fb.group({

    valeurs: this.fb.array([]),
    valeursRemboursees: this.fb.array([])
});



  valeurs= new FormGroup({
    valeur: new FormControl<number>(0),
    valeurRemboursee: new FormControl<number>(0),
  });


  constructor(private depense$:DepenseService, private fb:FormBuilder){};
 /* get valeurs() {
    return this.form.controls["valeurs"] as FormArray;
  }
  get valeursRemboursees() {
    return this.form.controls["valeursRemboursees"] as FormArray;
  }*/

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['categorie', 'coutUnitaire', 'plafond', 'valeur', 'valeurRemboursee','supprimer','valider'];
  dataSource = this.depense$.getAll();
  onSubmit(id: string) {
    // TODO: Use EventEmitter with form value
    this.depense$.update({id: id, valeur:<number>this.valeurs.value.valeur, valeurRemboursee:<number>this.valeurs.value.valeurRemboursee });
  }
  @ViewChild(MatTable) table!: MatTable<Depense>;

  /*addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push();
    this.table.renderRows();
  }*/

  /*removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }*/

}
