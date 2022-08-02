import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Technicien} from "../../model/technicien";

@Component({
  selector: 'app-edit-technicien-dialog',
  template:`
  <form [formGroup]="technicienControl">
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
  <button mat-button [disabled]="!technicienControl.valid"  [mat-dialog-close]="technicienControl.value" >Ok</button>
  `,
  styles: ['']
})
export class EditTechnicienDialogComponent implements OnInit {
  technicienControl!: FormGroup<{id: FormControl<number>, nom: FormControl, prenom: FormControl}>;

  constructor(@Inject(MAT_DIALOG_DATA) private tech: Technicien) { }

  ngOnInit(): void {
    this.technicienControl = new FormGroup({
      id: new FormControl<number>(this.tech.id,{nonNullable:true}),
      nom: new FormControl(this.tech.nom,Validators.required),
      prenom: new FormControl(this.tech.prenom,Validators.required)
    });
  }

}
