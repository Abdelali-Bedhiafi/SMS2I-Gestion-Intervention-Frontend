import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Time} from "@angular/common";
import {DateAdapter} from "@angular/material/core";


interface DeplacementForm{
  date: FormControl<Date>;
  heureDebut:	FormControl<string|null>;
  heureFin: FormControl<string|null>;
}

@Component({
  selector: 'app-create-deplacement-dialog',
  templateUrl: './create-deplacement-dialog.component.html',
  styleUrls: ['./create-deplacement-dialog.component.css']
})
export class CreateDeplacementDialogComponent implements OnInit {

  deplacement!: FormGroup<DeplacementForm>;

  constructor( ) { }

  ngOnInit(): void {
    this.deplacement = new FormGroup<DeplacementForm>({
      date: new FormControl<Date>(new Date(),{nonNullable: true}),
      heureDebut: new FormControl("08:00",Validators.required),
      heureFin: new FormControl(null)
    });
  }

}
