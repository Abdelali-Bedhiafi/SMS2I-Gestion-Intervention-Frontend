import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DepenseComponent } from './depense/depense.component';
import { AjoutDepenseDialogComponent } from './ajout-depense-dialog/ajout-depense-dialog.component';
import { CheckListDetailComponent } from './check-list-detail/check-list-detail.component';

import { OrdreMissionModule } from './ordre-mission/ordre-mission.module';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddSousCategorieDialogComponent } from './add-sous-categorie-dialog/add-sous-categorie-dialog.component';
import {MatInputModule} from "@angular/material/input";
import { AddSoftwareDialogComponent } from './add-software-dialog/add-software-dialog.component';
import { AddMaterielDialogComponent } from './add-materiel-dialog/add-materiel-dialog.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatListModule} from "@angular/material/list";




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CheckListDetailComponent,
    DepenseComponent,
    AjoutDepenseDialogComponent,
    AddSousCategorieDialogComponent,
    AddSoftwareDialogComponent,
    AddMaterielDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    OrdreMissionModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
