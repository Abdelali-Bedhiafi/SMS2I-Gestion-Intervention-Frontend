import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-categorie-depense-dialog',
  template: `
    <form [formGroup]="categorielControl">
      <mat-form-field appearance="legacy">
        <mat-label>label</mat-label>
        <input matInput formControlName="label">
      </mat-form-field>
      <mat-form-field  appearance="legacy">
        <mat-label>plafond</mat-label>
        <input matInput type="number" formControlName="plafond">
      </mat-form-field>
      <mat-form-field appearance="legacy">
        <mat-label>cout unitaire</mat-label>
        <input matInput type="number" formControlName="coutUnitaire">
      </mat-form-field>
    </form>
    <button mat-button [mat-dialog-close]="null">Annuller</button>
    <button mat-button [disabled]="!categorielControl.valid" [mat-dialog-close]="categorielControl.value">Ok</button>
  `,
  styles: [
  ]
})
export class AddCategorieDepenseDialogComponent implements OnInit {

  categorielControl!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.categorielControl = new FormGroup({
      id: new FormControl(0),
      label: new FormControl<string|null>(null,Validators.required),
      plafond: new FormControl<number|null>(null,Validators.required),
      coutUnitaire: new FormControl<number|null>(null,Validators.required)
    });
  }

}
