import { Component, OnInit } from '@angular/core';
import {TechnicienService} from "../../service/technicien.service";
import {Technicien} from "../../model/technicien";
import {Observable} from "rxjs";

@Component({
  selector: 'app-affect-technicien-dialog',
  templateUrl: './affect-technicien-dialog.component.html',
  styleUrls: ['./affect-technicien-dialog.component.css']
})
export class AffectTechnicienDialogComponent implements OnInit {

  selected: Technicien|null = null;
  technicien$!: Observable<Technicien[]>
  constructor(private technicien: TechnicienService) { }

  ngOnInit(): void {
    this.technicien$ = this.technicien.getAll();
  }

}
