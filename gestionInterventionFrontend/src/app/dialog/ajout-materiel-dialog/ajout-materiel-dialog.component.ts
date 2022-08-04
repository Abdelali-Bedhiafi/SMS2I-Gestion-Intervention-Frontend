import {Component, Inject, OnInit} from '@angular/core';
import {Materiel} from "../../model/materiel";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-add-materiel-dialog',
  templateUrl: './ajout-materiel-dialog.component.html',
  styleUrls: ['./ajout-materiel-dialog.component.css']
})
export class AjoutMaterielDialogComponent implements OnInit {

  selected!: Materiel;

  constructor(@Inject(MAT_DIALOG_DATA)public materiels: Materiel[]) { }

  ngOnInit(): void {
  }

}
