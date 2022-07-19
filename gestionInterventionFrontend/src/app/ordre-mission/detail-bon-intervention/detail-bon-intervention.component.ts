import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BonInterventionService } from 'src/app/service/bon-intervention.service';
import { BonInterventionDetail } from '../model/bon-intervention-detail';

@Component({
  selector: 'app-detail-bon-intervention',
  templateUrl: './detail-bon-intervention.component.html',
  styleUrls: ['./detail-bon-intervention.component.css']
})
export class DetailBonInterventionComponent implements OnInit {

  bonIntervention!: BonInterventionDetail;
  constructor(private bonintervention : BonInterventionService) { }

  ngOnInit(): void {
    this.bonintervention.getById(1).subscribe((data)=>{
      this.bonIntervention = data;
    });
  }

}
