import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CategorieDepense } from '../../model/categorie-depense';
import { CategorieDepenseService } from '../../service/categorie-depense.service';

@Component({
  selector: 'app-ajout-depense-dialog',
  templateUrl: './ajout-depense-dialog.component.html',
  styleUrls: ['./ajout-depense-dialog.component.css']
})
export class AjoutDepenseDialogComponent implements OnInit {

  selectedCategorie!:CategorieDepense;
  constructor(@Inject(MAT_DIALOG_DATA) public categories: CategorieDepense[] ) { }

  ngOnInit(): void {

  }


}
