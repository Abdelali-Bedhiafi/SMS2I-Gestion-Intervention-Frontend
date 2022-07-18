import { Component, OnInit } from '@angular/core';
import {CheckList} from "../model/check-list";
import {Software} from "../model/software";
import {FormControl} from "@angular/forms";
import {CheckListService} from "../service/check-list.service";
import {SoftwareCategorieService} from "../service/software-categorie.service";
import {ActivatedRoute} from "@angular/router";

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
      let id: number = Number.parseInt(<string>params.get("id"));
      this.checkList$.getById(id).subscribe(checklist=>{
        this.checklist=checklist;
        this.checkCategorie(checklist.model);
        this.ready=true;
      });
    })

  }
  checkCategorie(model:{id: number, softwareCategories: {id: number, nom: string}[], softwares: {id: number}[]}) {
    // seulement les software specifie dans le model existe dans le chacklist
    if (model.softwares.length == this.checklist.softwares.length) {
      this.notAllCategoriesChecked = true;
      for (const categorie of model.softwareCategories) {
        this.categorie$.getById(categorie.id).subscribe(c => this.softwareMap.set(c.nom, {
          softwares: c.softwares,
          input: new FormControl()
        }));
      }
    }
    // pour que la liste des software depace celle de model tous les categorie doit etre specfiee dabord
    else if((model.softwareCategories.length + model.softwares.length)> this.checklist.softwares.length){
      this.notAllCategoriesChecked = true;
      // tous les software no specifies dans le model (liste des softwares de model)
      let addedSoftware: Software[] = [];
      // remplir la liste addedSoftware
      for (const software of this.checklist.softwares) {
        let added = true;
        for (const modelSoftware of model.softwares) {
          if (software.id== modelSoftware.id) added=false;
        }
        if(added) addedSoftware.push(software);
      }
      // parcourir l ensemble des categories du model afin de prendre les categories non encore specifie
      for (const categorie of model.softwareCategories) {
        // parcourir la liste des addedSoftware si aucun de ces software a la meme categorie alors creation du form de selection software
        let checked = false;
        for (const software of addedSoftware) {
          if (software.categorie == categorie.nom) {
            checked = true;
            break;
          }
        }
        if(!checked){
          this.categorie$.getById(categorie.id).subscribe(c => this.softwareMap.set(c.nom,{softwares:c.softwares,input: new FormControl()}) );
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
          this.checklist=checkList;
        }
      });
    }

  }


}


