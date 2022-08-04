import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Materiel} from "../../model/materiel";

@Component({
  selector: 'app-edit-materiel-dialog',
  template: `
    <form [formGroup]="materielControl">
      <mat-form-field>
        <mat-label>id</mat-label>
        <input matInput formControlName="id" readonly>
      </mat-form-field>
      <mat-form-field>
        <mat-label>label</mat-label>
        <input matInput formControlName="label">
      </mat-form-field>
    </form>
    <button mat-button [mat-dialog-close]="null">Annuller</button>
    <button mat-button [disabled]="!materielControl.valid" [mat-dialog-close]="materielControl.value">Ok</button>
  `,
  styles: []
})
export class EditMaterielDialogComponent implements OnInit {

  materielControl!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA)public materiel : Materiel) { }

  ngOnInit(): void {
    this.materielControl=new FormGroup({
      id: new FormControl(this.materiel.id),
      label: new FormControl(this.materiel.label,Validators.required)
    })
  }

}
