import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {F} from "@angular/cdk/keycodes";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-add-sous-categorie-dialog',
  templateUrl: './add-sous-categorie-dialog.component.html',
  styleUrls: ['./add-sous-categorie-dialog.component.css']
})
export class AddSousCategorieDialogComponent implements OnInit {

  sousCategorieControl!: FormGroup<{
    titre: FormControl<string>,
    description: FormControl<string>,
  }>


  constructor(@Inject(MAT_DIALOG_DATA) public categorie: string) { }

  ngOnInit(): void {
    this.sousCategorieControl = new FormGroup({
      titre: new FormControl('',{nonNullable:true}),
      description: new FormControl('',{nonNullable:true})
    });
  }

}
