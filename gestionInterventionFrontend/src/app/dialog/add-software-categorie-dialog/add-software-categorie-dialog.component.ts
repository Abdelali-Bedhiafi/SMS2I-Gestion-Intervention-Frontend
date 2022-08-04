import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-software-categorie',
  template: `
    <form [formGroup]="categorieControl">
      <mat-form-field appearance="legacy">
        <mat-label>nom</mat-label>
        <input matInput formControlName="nom">
      </mat-form-field>
    </form>
    <button mat-button [mat-dialog-close]="null">Annuller</button>
    <button mat-button [disabled]="!categorieControl.valid"  [mat-dialog-close]="categorieControl.value" >Ok</button>
  `
})
export class AddSoftwareCategorieDialogComponent implements OnInit {

  categorieControl!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.categorieControl= new FormGroup({
      id: new FormControl(0),
      nom: new FormControl<string|null>(null,Validators.required)
    });
  }

}
