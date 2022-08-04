import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-add-software-dialog',
  template: `
    <form [formGroup]="softwareControl">
      <mat-form-field appearance="legacy">
        <mat-label>label</mat-label>
        <input matInput formControlName="softwareLabel">
      </mat-form-field>
      <mat-form-field appearance="legacy">
        <mat-label>version</mat-label>
        <input matInput formControlName="softwareVersion">
      </mat-form-field>
    </form>
    <button mat-button [mat-dialog-close]="null">Annuller</button>
    <button mat-button [disabled]="!softwareControl.valid"  [mat-dialog-close]="softwareControl.value" >Ok</button>
  `

})
export class AddSoftwareDialogComponent implements OnInit {

  softwareControl!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA)public categorie: String) { }

  ngOnInit(): void {
    this.softwareControl = new FormGroup({
      id: new FormControl(0),
      softwareLabel: new FormControl<string|null>(null, Validators.required),
      softwareVersion: new FormControl<string|null>(null, Validators.required),
      categorie: new FormControl(this.categorie),
    });
  }

}
