import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-superviseur-dialog',
  template: `
    <form [formGroup]="superviseurControl">
      <mat-form-field appearance="legacy">
        <mat-label> nom </mat-label>
        <input matInput formControlName="nom">
      </mat-form-field>
      <mat-form-field appearance="legacy">
        <mat-label>prenom</mat-label>
        <input matInput formControlName="prenom">
      </mat-form-field>
    </form>
    <button mat-button [mat-dialog-close]="null">Annuller</button>
    <button mat-button [disabled]="!superviseurControl.valid" [mat-dialog-close]="superviseurControl.value">Ok</button>
  `,
  styles: ['']
})
export class AddSuperviseurDialogComponent implements OnInit {
  superviseurControl!: FormGroup<{nom: FormControl, prenom: FormControl}>;

  constructor() { }

  ngOnInit(): void {
    this.superviseurControl= new FormGroup({
      nom: new FormControl(null,{validators: Validators.required,updateOn:"change"}),
      prenom: new FormControl(null,{validators: Validators.required, updateOn:"change"})
    });
  }

}
