import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SoftwareCategorie} from "../../model/software-categorie";

@Component({
  selector: 'app-edit-software-categorie',
  template: `
    <form [formGroup]="categorieControl">
      <mat-form-field appearance="legacy">
        <mat-label>id</mat-label>
        <input matInput formControlName="id" readonly>
      </mat-form-field>
      <mat-form-field appearance="legacy">
        <mat-label>nom</mat-label>
        <input matInput formControlName="nom">
      </mat-form-field>
    </form>
    <button mat-button [mat-dialog-close]="null">Annuller</button>
    <button mat-button [disabled]="!categorieControl.valid"  [mat-dialog-close]="categorieControl.value" >Ok</button>
  `
})
export class EditSoftwareCategorieDialogComponent implements OnInit {

  categorieControl!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA)public categorie: SoftwareCategorie) { }

  ngOnInit(): void {
    this.categorieControl= new FormGroup({
      id: new FormControl(this.categorie.id),
      nom: new FormControl<string>(this.categorie.nom,Validators.required)
    });
  }

}
