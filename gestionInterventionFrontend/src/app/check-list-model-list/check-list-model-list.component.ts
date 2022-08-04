import { Component, OnInit } from '@angular/core';
import {CheckListModelService} from "../service/check-list-model.service";
import {CheckListModel} from "../model/check-list-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-check-list-model-list',
  templateUrl: './check-list-model-list.component.html',
  styleUrls: ['./check-list-model-list.component.css']
})
export class CheckListModelListComponent implements OnInit {

  models!: CheckListModel[];

  constructor(private model$: CheckListModelService,
              private router: Router) { }

  ngOnInit(): void {
    this.model$.getAll().subscribe(list=>{
      this.models=list
    })
  }

  add(){
    const modelName = prompt("nom du model",undefined);
    if(modelName){
      this.model$.add({id:0,nom:modelName}).subscribe(model=>{
        this.router.navigate(['/checkListModel',model.id]).then();
      });
    }
  }

  edit(model:CheckListModel){
    this.router.navigate(['/checkListModel',model.id]).then();
  }

  delete(model:CheckListModel){
    this.model$.delete(model).subscribe(()=>{
      const i = this.models.findIndex(m => m.id=model.id);
      this.models.splice(i,1);
    });
  }
}
