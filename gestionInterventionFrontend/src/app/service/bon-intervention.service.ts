import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BonInterventionDetail } from '../ordre-mission/model/bon-intervention-detail';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class BonInterventionService {

  constructor(private backend: BackendService) { }
  getById(id: number):Observable<BonInterventionDetail>{
    return this.backend.sendGetRequest<BonInterventionDetail>("bonIntervention/"+id)
  }

  update(bonIntervention:BonInterventionDetail):Observable<BonInterventionDetail>{

     return this.backend.sendPutRequest<BonInterventionDetail>("bonIntervention/"+bonIntervention.id,bonIntervention);

  }


}
