import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { AffectTechnicienDialogComponent } from './dialog/affect-technicien-dialog/affect-technicien-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { CreateDeplacementDialogComponent } from './dialog/create-deplacement-dialog/create-deplacement-dialog.component';
import { EditDeplacementDialogComponent } from './dialog/edit-deplacement-dialog/edit-deplacement-dialog.component';
import { SelectCheckListModelDialogComponent } from './dialog/select-check-list-model-dialog/select-check-list-model-dialog.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ClipboardModule} from "@angular/cdk/clipboard";
import { CategorieCheckListComponent } from './categorie-check-list/categorie-check-list.component';
import {RouterModule} from "@angular/router";




@NgModule({
  declarations: [
    CreationOrdreMissionComponent,
    DetailOrdreMissionComponent,
    DetailBonInterventionComponent,
    AffectTechnicienDialogComponent,
    CreateDeplacementDialogComponent,
    EditDeplacementDialogComponent,
    SelectCheckListModelDialogComponent,
    CategorieCheckListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressBarModule,
    ClipboardModule,
    RouterModule
  ],
  exports: [
    CreationOrdreMissionComponent,
    DetailOrdreMissionComponent,
    DetailBonInterventionComponent
  ]
})
export class OrdreMissionModule { }
