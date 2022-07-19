import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategorieDepense } from '../model/categorie-depense';
import { CategorieDepenseService } from '../service/categorie-depense.service';

@Component({
  selector: 'app-ajout-depense-dialog',
  templateUrl: './ajout-depense-dialog.component.html',
  styleUrls: ['./ajout-depense-dialog.component.css']
})
export class AjoutDepenseDialogComponent implements OnInit {
  categories!: Observable<CategorieDepense[]>
  selectedCategorie!:CategorieDepense;
  constructor(private categorie: CategorieDepenseService) { }

  ngOnInit(): void {
    this.categories=this.categorie.categories();
  }


}
