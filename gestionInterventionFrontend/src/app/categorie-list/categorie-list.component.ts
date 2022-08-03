import { Component, OnInit } from '@angular/core';
import {Categorie} from "../model/categorie";

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent implements OnInit {

  categories= Categorie;
  constructor() { }

  ngOnInit(): void {
  }

}
