import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Deplacement} from "../../model/deplacement";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Time} from "@angular/common";

interface DeplacementForm{
  date: FormControl<Date>;
  heureDebut:	FormControl<string|null>;
  heureFin: FormControl<string|null>;
}

@Component({
  selector: 'app-edit-deplacement-dialog',
  templateUrl: './edit-deplacement-dialog.component.html',
  styleUrls: ['./edit-deplacement-dialog.component.css']
})
export class EditDeplacementDialogComponent implements OnInit {

  deplacementForm!: FormGroup<DeplacementForm>;

  constructor(@Inject(MAT_DIALOG_DATA) public deplacement: Deplacement) { }

  ngOnInit(): void {
    this.deplacementForm = new FormGroup<DeplacementForm>({
      date: new FormControl(this.deplacement.date,{nonNullable: true}),
      heureDebut: new FormControl(this.deplacement.heureDebut,Validators.required),
      heureFin: new FormControl(this.deplacement.heureFin)
    })
  }

}
