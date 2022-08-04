import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-materiel-dialog',
  template: `
    <form [formGroup]="materielControl">
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
export class AddMaterielDialogComponent implements OnInit {
  materielControl!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.materielControl = new FormGroup({
      id: new FormControl(0),
      label: new FormControl<string|null>(null,Validators.required)
    });
  }

}
