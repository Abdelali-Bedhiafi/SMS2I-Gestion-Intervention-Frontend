import { Component, ViewChild } from '@angular/core';
import {MatTable} from '@angular/material/table';

export interface PeriodicElement {
  categorie: string;
  coutUnitaire: number;
  plafond: number;
  valeur: number;
  valeurRemboursee: number;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {categorie: 'restauration', coutUnitaire: 5000, plafond: 10000, valeur: 7500, valeurRemboursee: 7500},
  {categorie: 'restauration', coutUnitaire: 5000, plafond: 10000, valeur: 7500, valeurRemboursee: 7500},

];

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent  {

  displayedColumns: string[] = ['categorie', 'coutUnitaire', 'plafond', 'valeur', 'valeurRemboursee'];
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table!: MatTable<PeriodicElement>;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }

}
