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
    const body ={
      tags : bonIntervention.tags.map(t => { return {id: t.id}}),
      categories : bonIntervention.categories.map (c => {return {id : c.id}}) ,
      mission : {id : bonIntervention.mission.id} ,
      observationTechnicien : bonIntervention.observationTechnicien,
      archiveUrl: bonIntervention.archiveUrl ,
      dureeTotale: bonIntervention.dureeTotale





    }

     return this.backend.sendPutRequest<BonInterventionDetail>("bonIntervention/"+bonIntervention.id,bonIntervention);

  }


}
