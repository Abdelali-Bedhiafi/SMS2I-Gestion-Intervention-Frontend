import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Software} from "../model/software";

@Component({
  selector: 'app-add-software-dialog',
  templateUrl: './add-software-dialog.component.html',
  styleUrls: ['./add-software-dialog.component.css']
})
export class AddSoftwareDialogComponent implements OnInit {
  selected!: Software;
  categories!: {categorie:string, softwares: Software[]}[];
  constructor(@Inject(MAT_DIALOG_DATA) public softwares: Software[]) { }

  ngOnInit(): void {
    let categories: string[]=[];
    this.categories=[];
    this.softwares.forEach( s => {
      if(!categories.includes(s.categorie)) categories.push(s.categorie);
    });
    categories.forEach(c => this.categories.push({categorie:c,softwares: this.softwares.filter(s => s.categorie==c)}));
  }

}
