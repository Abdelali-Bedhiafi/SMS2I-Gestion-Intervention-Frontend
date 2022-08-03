import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-tag-dialog',
  template: `
  <mat-form-field appearance="legacy">
    <mat-label>valeur</mat-label>
    <input matInput [formControl]="valuerControl">
  </mat-form-field>
  <button mat-button [mat-dialog-close]="null">Annuller</button>
  <button mat-button [disabled]="!valuerControl.valid" [mat-dialog-close]="valuerControl.value">Ok</button>
  `,
  styles: []
})
export class AddTagDialogComponent implements OnInit {
  valuerControl!: FormControl<string>;

  constructor() { }

  ngOnInit(): void {
    this.valuerControl= new FormControl('',{nonNullable:true,validators: Validators.required});
  }

}
