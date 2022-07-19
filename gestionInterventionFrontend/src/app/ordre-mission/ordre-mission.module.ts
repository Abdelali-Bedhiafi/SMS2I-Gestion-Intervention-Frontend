import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {DetailBonInterventionComponent} from "./detail-bon-intervention/detail-bon-intervention.component";
import {MatChipsModule} from "@angular/material/chips";
import {MatCheckboxModule} from "@angular/material/checkbox";




@NgModule({


  declarations: [
    CreationOrdreMissionComponent,
    DetailOrdreMissionComponent,
    DetailBonInterventionComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCheckboxModule
  ]
})
export class OrdreMissionModule { }
