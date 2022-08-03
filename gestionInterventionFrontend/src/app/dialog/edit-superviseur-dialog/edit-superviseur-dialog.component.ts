import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Superviseur} from "../../model/superviseur";

@Component({
  selector: 'app-edit-superviseur-dialog',
  template:`
  <form [formGroup]="superviseurControl">
    <mat-form-field appearance="legacy">
      <mat-label> id </mat-label>
      <input matInput readonly formControlName="id">
    </mat-form-field>
    <mat-form-field appearance="legacy">
      <mat-label>nom</mat-label>
      <input matInput formControlName="nom">
    </mat-form-field>
    <mat-form-field appearance="legacy">
      <mat-label>prenom</mat-label>
      <input matInput formControlName="prenom">
    </mat-form-field>
  </form>
  <button mat-button [mat-dialog-close]="null">Annuller</button>
  <button mat-button [disabled]="!superviseurControl.valid"  [mat-dialog-close]="superviseurControl.value" >Ok</button>
  `,
  styles: ['']
})
export class EditSuperviseurDialogComponent implements OnInit {
  superviseurControl!: FormGroup<{id: FormControl<number>, nom: FormControl, prenom: FormControl}>;

  constructor(@Inject(MAT_DIALOG_DATA) private superviseur: Superviseur) { }

  ngOnInit(): void {
    this.superviseurControl = new FormGroup({
      id: new FormControl<number>(this.superviseur.id,{nonNullable:true}),
      nom: new FormControl(this.superviseur.nom,Validators.required),
      prenom: new FormControl(this.superviseur.prenom,Validators.required)
    });
  }

}
