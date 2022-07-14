import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdreMissionRoutingModule } from './ordre-mission-routing.module';
import { CreationOrdreMissionComponent } from './creation-ordre-mission/creation-ordre-mission.component';


@NgModule({
  declarations: [
    CreationOrdreMissionComponent
  ],
  imports: [
    CommonModule,
    OrdreMissionRoutingModule
  ]
})
export class OrdreMissionModule { }
