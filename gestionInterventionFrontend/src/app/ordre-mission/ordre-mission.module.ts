import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdreMissionRoutingModule } from './ordre-mission-routing.module';
import { CreationOrdreMissionComponent } from './creation-ordre-mission/creation-ordre-mission.component';
import { DetailOrdreMissionComponent } from './detail-ordre-mission/detail-ordre-mission.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({


  declarations: [
    CreationOrdreMissionComponent,
    DetailOrdreMissionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    OrdreMissionRoutingModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  exports:[
    CreationOrdreMissionComponent
  ]
})
export class OrdreMissionModule { }
