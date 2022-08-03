import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-tag-group',
  template:`
    <mat-form-field appearance="legacy">
      <mat-label>nom</mat-label>
      <input matInput [formControl]="nomControl">
    </mat-form-field>
    <button mat-button [mat-dialog-close]="null">Annuller</button>
    <button mat-button [disabled]="!nomControl.valid" [mat-dialog-close]="nomControl.value">Ok</button>
  `,
  styles: []
})
export class AddTagGroupDialogComponent implements OnInit {

  nomControl!: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.nomControl = new FormControl('',Validators.required);
  }

}
