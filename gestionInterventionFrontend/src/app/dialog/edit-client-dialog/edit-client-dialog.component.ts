import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Client} from "../../model/client";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-client',
  template:`
  <form [formGroup]="clientControl">
    <mat-form-field appearance="legacy">
      <mat-label> id </mat-label>
      <input matInput readonly formControlName="id">
    </mat-form-field>
    <mat-form-field appearance="legacy">
      <mat-label>nom</mat-label>
      <input matInput formControlName="nom">
    </mat-form-field>
    <mat-form-field appearance="legacy">
      <mat-label>address</mat-label>
      <input matInput formControlName="address">
    </mat-form-field>
  </form>
  <button mat-button [mat-dialog-close]="null">Annuller</button>
  <button mat-button [disabled]="!clientControl.valid"  [mat-dialog-close]="clientControl.value" >Ok</button>
  `,
  styles: ['']
})
export class EditClientDialogComponent implements OnInit {
  clientControl!: FormGroup<{id: FormControl<number>,nom: FormControl, address: FormControl}>;


  constructor(@Inject(MAT_DIALOG_DATA) private client: Client) { }

  ngOnInit(): void {
    this.clientControl = new FormGroup({
      id: new FormControl(this.client.id,{nonNullable:true}),
      nom: new FormControl(this.client.nom, Validators.required),
      address: new FormControl(this.client.address, Validators.required)
    })
  }

}
