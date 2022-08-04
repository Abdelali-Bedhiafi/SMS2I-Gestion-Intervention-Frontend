import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Software} from "../../model/software";

@Component({
  selector: 'app-edit-software',
  template: `
    <form [formGroup]="softwareControl">
      <mat-form-field>
        <mat-label>id</mat-label>
        <input matInput formControlName="id" readonly>
      </mat-form-field>
      <mat-form-field>
        <mat-label>label</mat-label>
        <input matInput formControlName="softwareLabel">
      </mat-form-field>
      <mat-form-field>
        <mat-label>version</mat-label>
        <input matInput formControlName="softwareVersion">
      </mat-form-field>
      <mat-form-field>
        <mat-label>categorie</mat-label>
        <input matInput formControlName="categorie" readonly>
      </mat-form-field>
    </form>
    <button mat-button [mat-dialog-close]="null">Annuller</button>
    <button mat-button [disabled]="!softwareControl.valid"  [mat-dialog-close]="softwareControl.value" >Ok</button>
  `
})
export class EditSoftwareDialogComponent implements OnInit {

  softwareControl!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA)public software: Software) { }

  ngOnInit(): void {
    this.softwareControl = new FormGroup({
      id: new FormControl(this.software.id),
      softwareLabel: new FormControl(this.software.softwareLabel, Validators.required),
      softwareVersion: new FormControl(this.software.softwareVersion, Validators.required),
      categorie: new FormControl(this.software.categorie),
    });
  }

}
