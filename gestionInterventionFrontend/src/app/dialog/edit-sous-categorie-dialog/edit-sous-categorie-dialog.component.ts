import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SousCategorie} from "../../model/sous-categorie";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-sous-categorie-dialog',
  template: `
    <form [formGroup]="sousCategorieControl">
      <mat-form-field appearance="fill">
        <mat-label>titre</mat-label>
        <input matInput formControlName="titre">
      </mat-form-field>
      <br>
      <mat-form-field>
        <mat-label>description</mat-label>
        <input matInput formControlName="description">
      </mat-form-field>
      <br>
      <mat-label>categorie: </mat-label>
      {{categorie.categorie.split('_')[0].toLowerCase()}}
    </form>
    <button mat-button [mat-dialog-close]="null">Annuller</button>
    <button mat-button [disabled]="!sousCategorieControl.valid"  [mat-dialog-close]="sousCategorieControl.value" >Ok</button>

  `,
  styles: ['']
})
export class EditSousCategorieDialogComponent implements OnInit {

  sousCategorieControl!: FormGroup<{
    titre: FormControl<string>,
    description: FormControl<string>,
  }>

  constructor(@Inject(MAT_DIALOG_DATA) public categorie: SousCategorie ) { }

  ngOnInit(): void {
    this.sousCategorieControl = new FormGroup({
      titre: new FormControl(this.categorie.titre,{validators: Validators.required,nonNullable:true}),
      description: new FormControl(this.categorie.description,{nonNullable:true})
    });
  }

}
