import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdreMissionRoutingModule } from './ordre-mission-routing.module';

import { CreationOrdreMissionComponent } from './creation-ordre-mission/creation-ordre-mission.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    CreationOrdreMissionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrdreMissionRoutingModule,
    MatDatepickerModule
  ]
})
export class OrdreMissionModule { }
