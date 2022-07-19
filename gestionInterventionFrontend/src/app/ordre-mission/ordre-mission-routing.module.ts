import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreationOrdreMissionComponent } from './creation-ordre-mission/creation-ordre-mission.component';
import { DetailBonInterventionComponent } from './detail-bon-intervention/detail-bon-intervention.component';
import { DetailOrdreMissionComponent } from './detail-ordre-mission/detail-ordre-mission.component';

const routes: Routes = [
  { path: "detail/:id", component: DetailOrdreMissionComponent },
  { path: "creation", component: CreationOrdreMissionComponent },
  {path:"detailBon",component:DetailBonInterventionComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdreMissionRoutingModule { }
