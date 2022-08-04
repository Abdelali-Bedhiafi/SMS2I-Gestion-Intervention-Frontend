import {Component, Inject, OnInit} from '@angular/core';
import {SoftwareCategorie} from "../../model/software-categorie";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-ajout-software-categorie-dialog',
  templateUrl: './ajout-software-categorie-dialog.component.html',
  styleUrls: ['./ajout-software-categorie-dialog.component.css']
})
export class AjoutSoftwareCategorieDialogComponent implements OnInit {

  selected!: SoftwareCategorie;

  constructor(@Inject(MAT_DIALOG_DATA)public categories: SoftwareCategorie[]) { }

  ngOnInit(): void {
  }

}
