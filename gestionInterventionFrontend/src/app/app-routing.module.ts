import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailOrdreMissionComponent } from './ordre-mission/detail-ordre-mission/detail-ordre-mission.component';

const routes: Routes = [
  {
    path: "details",component:DetailOrdreMissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
