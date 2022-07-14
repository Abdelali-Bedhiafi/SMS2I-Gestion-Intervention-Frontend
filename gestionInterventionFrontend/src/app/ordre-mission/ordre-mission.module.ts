import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdreMissionRoutingModule } from './ordre-mission-routing.module';
import { TestDetailComponent } from './test-detail/test-detail.component';


@NgModule({
  declarations: [
    TestDetailComponent
  ],
  imports: [
    CommonModule,
    OrdreMissionRoutingModule
  ],
  exports:[
    TestDetailComponent
  ]
})
export class OrdreMissionModule { }
