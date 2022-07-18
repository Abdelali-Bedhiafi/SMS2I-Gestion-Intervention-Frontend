import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable} from '@angular/material/table';
import { Depense } from '../model/depense';
import { DepenseService } from '../service/depense.service';



@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent implements OnInit {

  constructor(private depense$:DepenseService){};
  ngOnInit(): void {
  }

  displayedColumns: string[] = ['categorie', 'coutUnitaire', 'plafond', 'valeur', 'valeurRemboursee'];
  dataSource = this.depense$.getAll();

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
