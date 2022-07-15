import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreationOrdreMissionComponent } from './creation-ordre-mission/creation-ordre-mission.component';
import { DetailOrdreMissionComponent } from './detail-ordre-mission/detail-ordre-mission.component';

const routes: Routes = [
  { path: "details", component: DetailOrdreMissionComponent },
  { path: "creation", component: CreationOrdreMissionComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdreMissionRoutingModule { }
