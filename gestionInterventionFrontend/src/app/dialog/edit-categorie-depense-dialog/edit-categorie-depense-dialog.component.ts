import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CategorieDepense} from "../../model/categorie-depense";

@Component({
  selector: 'app-edit-categorie-depense-dialog',
  template: `
    <form [formGroup]="categorielControl">
      <mat-form-field appearance="legacy">
        <mat-label>id</mat-label>
        <input matInput formControlName="id" readonly>
      </mat-form-field>
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
export class EditCategorieDepenseDialogComponent implements OnInit {

  categorielControl!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA)public categorie: CategorieDepense) { }

  ngOnInit(): void {
    this.categorielControl = new FormGroup({
      id: new FormControl(this.categorie.id),
      label: new FormControl<string>(this.categorie.label,Validators.required),
      plafond: new FormControl<number>(this.categorie.plafond,Validators.required),
      coutUnitaire: new FormControl<number>(this.categorie.coutUnitaire,Validators.required)
    });
  }

}
