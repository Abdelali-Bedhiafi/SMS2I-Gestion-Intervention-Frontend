import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-technicien-dialog',
  template: `
    <form [formGroup]="technicienControl">
      <mat-form-field appearance="legacy">
        <mat-label> nom </mat-label>
        <input matInput formControlName="nom">
      </mat-form-field>
      <mat-form-field appearance="legacy">
        <mat-label>prenom</mat-label>
        <input matInput formControlName="prenom">
      </mat-form-field>
      <mat-form-field appearance="legacy">
        <mat-label>password</mat-label>
        <input matInput type="password" formControlName="password">
      </mat-form-field>
    </form>
    <button mat-button [mat-dialog-close]="null">Annuller</button>
    <button mat-button [disabled]="!technicienControl.valid" [mat-dialog-close]="technicienControl.value">Ok</button>
  `,
  styles: ['']
})
export class AddTechnicienDialogComponent implements OnInit {
  technicienControl!:  FormGroup<{nom: FormControl, prenom: FormControl, password: FormControl}>;

  constructor() { }

  ngOnInit(): void {
    this.technicienControl= new FormGroup({
      nom: new FormControl('',{validators: Validators.required,updateOn:"change"}),
      prenom: new FormControl('',{validators: Validators.required, updateOn:"change"}),
      password: new FormControl('',{validators:[Validators.required, Validators.minLength(4)]})
    });
  }

}
