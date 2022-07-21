import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SousCategorie } from 'src/app/model/sous-categorie';
import { BonInterventionService } from 'src/app/service/bon-intervention.service';
import { SousCategorieService } from 'src/app/service/sous-categorie.service';
import { BonInterventionDetail } from '../model/bon-intervention-detail';

@Component({
  selector: 'app-detail-bon-intervention',
  templateUrl: './detail-bon-intervention.component.html',
  styleUrls: ['./detail-bon-intervention.component.css']
})
export class DetailBonInterventionComponent implements OnInit {


  bonIntervention!: BonInterventionDetail;
  actions!:SousCategorie[];

  constructor(private bonintervention : BonInterventionService,
    private sousCategori$: SousCategorieService) { }

  ngOnInit(): void {
    this.sousCategori$.getAllByCategorie("action").subscribe(list=>{
      this.actions=list;
    })
    this.bonintervention.getById(1).subscribe((data)=>{
      this.bonIntervention = data;
      console.log(data);
    });
  }

  submitchange(){

    this.bonintervention.update(this.bonIntervention).subscribe((bon)=>{
      window.alert("mise a jour affecte")
    });

  }





}
