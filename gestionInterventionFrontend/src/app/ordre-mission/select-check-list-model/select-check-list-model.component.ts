import { Component, OnInit } from '@angular/core';
import {CheckListModel} from "../../model/check-list-model";
import {CheckListModelService} from "../../service/check-list-model.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-select-check-list-model',
  templateUrl: './select-check-list-model.component.html',
  styleUrls: ['./select-check-list-model.component.css']
})
export class SelectCheckListModelComponent implements OnInit {

  checkListModels$!:Observable<CheckListModel[]>;
  selected!: CheckListModel;
  constructor(private checkListModel: CheckListModelService) { }

  ngOnInit(): void {
    this.checkListModels$=this.checkListModel.getAll();
  }

}
