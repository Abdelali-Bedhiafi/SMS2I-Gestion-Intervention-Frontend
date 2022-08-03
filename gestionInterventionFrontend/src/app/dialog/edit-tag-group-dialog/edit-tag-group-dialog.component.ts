import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GroupTags} from "../../model/group-tags";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-tag-group-dialog',
  template: `
  <mat-form-field appearance="legacy">
    <input matInput [value]="group.id.toString()" readonly>
  </mat-form-field>
  <mat-form-field appearance="legacy">
    <input matInput [formControl]="nomControl">
  </mat-form-field>
  <button mat-button [mat-dialog-close]="null">Annuller</button>
  <button mat-button [disabled]="!nomControl.valid" [mat-dialog-close]="nomControl.value">Ok</button>
  `,
  styles: []
})
export class EditTagGroupDialogComponent implements OnInit {

  nomControl!: FormControl<string>;

  constructor(@Inject(MAT_DIALOG_DATA)public group : GroupTags) { }

  ngOnInit(): void {
    this.nomControl = new FormControl(this.group.nomGroup,{validators:Validators.required,nonNullable:true});
  }

}
