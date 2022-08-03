import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Tags} from "../../model/tags";

@Component({
  selector: 'app-edit-tag-dialog',
  template: `
    <form >
      <mat-form-field>
        <mat-label>id</mat-label>
        <input matInput [value]="tag.id.toString()" readonly>
      </mat-form-field>
      <mat-form-field>
        <mat-label>valeur</mat-label>
        <input matInput [formControl]="valeurControl">
      </mat-form-field>
      <mat-form-field>
        <mat-label>group</mat-label>
        <input matInput [value]="tag.groupe" readonly>
      </mat-form-field>
    </form>
    <button mat-button [mat-dialog-close]="null">Annuller</button>
    <button mat-button [disabled]="!valeurControl.valid" [mat-dialog-close]="valeurControl.value">Ok</button>
 `,
  styles: []
})
export class EditTagDialogComponent implements OnInit {

  valeurControl!: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA)public tag: Tags) { }

  ngOnInit(): void {
    this.valeurControl = new FormControl(this.tag.valeur,{nonNullable:true,validators: Validators.required});
  }

}
