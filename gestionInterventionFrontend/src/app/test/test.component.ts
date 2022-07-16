import { Component, OnInit } from '@angular/core';
import {CheckListService} from "../service/check-list.service";
import {CheckList} from "../model/check-list";
import {Software} from "../model/software";
import {SoftwareService} from "../service/software.service";
import {SoftwareCategorieService} from "../service/software-categorie.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  checklist!: CheckList;
  softwareMap: Map<string, Software[]> = new Map<string, Software[]>();
  notAllCategoriesChecked = false;
  ready= false;

  constructor(private checkList$: CheckListService,
              private categorie$: SoftwareCategorieService) { }

  ngOnInit(): void {
      this.checkList$.getById(10).subscribe(checklist=>{
        this.checklist=checklist;
        this.checkCategorie(checklist.model.softwareCategories);
        this.ready=true;
      });
  }
  checkCategorie(categories:[{ id: number; nom: string;}]){
    for (const categorie of categories) {
      let checked = false;
      for (const software of this.checklist.softwares) {
        if(software.categorie==categorie.nom){
          checked=true;
          break;
        }
        if(!checked){
          this.notAllCategoriesChecked = true;
          this.categorie$.getById(categorie.id).subscribe(c => this.softwareMap.set(c.nom,c.softwares) );
          }
        }
      }
  }



}

interface Categorie{
  id: number;
  nom: string;
}
