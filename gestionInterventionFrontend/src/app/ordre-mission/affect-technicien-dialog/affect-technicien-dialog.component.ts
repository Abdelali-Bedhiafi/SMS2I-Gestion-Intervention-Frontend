import {Component, Inject, OnInit} from '@angular/core';
import {Technicien} from "../../model/technicien";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-affect-technicien-dialog',
  templateUrl: './affect-technicien-dialog.component.html',
  styleUrls: ['./affect-technicien-dialog.component.css']
})
export class AffectTechnicienDialogComponent implements OnInit {

  selected: Technicien|null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public technicien$: Technicien[]) { }

  ngOnInit(): void {
    ;
  }

}
