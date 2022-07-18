import { Component, OnInit } from '@angular/core';
import {CheckList} from "../model/check-list";
import {Software} from "../model/software";
import {FormControl} from "@angular/forms";
import {CheckListService} from "../service/check-list.service";
import {SoftwareCategorieService} from "../service/software-categorie.service";
import {ActivatedRoute} from "@angular/router";
import {Material} from "../model/material";
import {CheckListModel} from "../model/check-list-model";

@Component({
  selector: 'app-check-list-detail',
  templateUrl: './check-list-detail.component.html',
  styleUrls: ['./check-list-detail.component.css']
})
export class CheckListDetailComponent implements OnInit {

  checklist!: CheckList;
  softwareMap: Map<string,{softwares:Software[],input:FormControl<Software>}> =new Map<string, {softwares: Software[]; input: FormControl<Software>}>();
  notAllCategoriesChecked = false;
  ready= false;

  constructor(private checkList$: CheckListService,
              private categorie$: SoftwareCategorieService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      let id = Number.parseInt(<string>params.get("id"));
      this.checkList$.getById(id).subscribe(checklist=>{
        this.checklist=checklist;
        this.checkCategorie(checklist.model);
        this.ready=true;
      });
    })

  }
  checkCategorie(model:CheckListModel) {
    // aucun  software est ajoute et liste des categories n est pas vide
    if(this.checklist.softwares.length==0 && model.softwareCategories.length!=0 ){
      console.log("here");
      this.notAllCategoriesChecked = true;
      for (const category of model.softwareCategories) {
        this.softwareMap.set(category.nom,{softwares: category.softwares,input: new FormControl()});
      }
    }
    // pour que la liste des software depace celle de model tous les categorie doit etre specfiee dabord
    else if (model.softwareCategories.length > this.checklist.softwares.length){
      this.notAllCategoriesChecked = true;
      // parcourir l ensemble des categories du model afin de prendre les categories non encore specifie
      for (const categorie of model.softwareCategories) {
        // parcourir la liste des Software du checklist si aucun de ces software a la meme categorie alors creation du form de selection software
        let checked = false;
        for (const software of this.checklist.softwares) {
          if (software.categorie == categorie.nom) {
            checked = true;
            break;
          }
        }
        if(!checked){
          this.softwareMap.set(categorie.nom,{softwares:categorie.softwares,input: new FormControl()}) ;
        }
      }
    }
  }

  selectSoftware(categorie: string){
    let selectedSoftware =this.softwareMap.get(categorie)?.input.value;
    // valider input
    if (selectedSoftware != undefined){
      // cree une copy
      const newChecklist:CheckList = { id:this.checklist.id,materiels:this.checklist.materiels,softwares:[],model:this.checklist.model};
      this.checklist.softwares.forEach(software =>newChecklist.softwares.push(software));
      // ajouter le software
      newChecklist.softwares.push(selectedSoftware);
      // envoyer la requette
      this.checkList$.update(this.checklist.id,newChecklist).subscribe(checkList => {
        // en cas de validation (software ajoutee)
        if (this.checklist.softwares.length < checkList.softwares.length) {
          // MAJ liste des categorie a remplir et checklist
          this.softwareMap.delete(categorie);
          this.checklist=newChecklist;
          if(this.softwareMap.size==0) this.notAllCategoriesChecked=false;
        }
      });
    }

  }

  addMaterial(materiel: Material):void {
    this.checklist.materiels.push(materiel);
    this.checkList$.update(this.checklist.id,this.checklist);
  }
  addSoftware(software: Software):void{
    this.checklist.softwares.push(software);
    this.checkList$.update(this.checklist.id,this.checklist);
  }


}


