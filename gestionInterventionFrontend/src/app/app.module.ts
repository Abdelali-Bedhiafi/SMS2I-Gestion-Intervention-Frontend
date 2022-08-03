import {APP_INITIALIZER, NgModule} from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DepenseComponent } from './depense/depense.component';
import { AjoutDepenseDialogComponent } from './dialog/ajout-depense-dialog/ajout-depense-dialog.component';
import { CheckListDetailComponent } from './check-list-detail/check-list-detail.component';

import { OrdreMissionModule } from './ordre-mission/ordre-mission.module';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http'
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
import { AddSousCategorieDialogComponent } from './dialog/add-sous-categorie-dialog/add-sous-categorie-dialog.component';
import {MatInputModule} from "@angular/material/input";
import { AddSoftwareDialogComponent } from './dialog/add-software-dialog/add-software-dialog.component';
import { AddMaterielDialogComponent } from './dialog/add-materiel-dialog/add-materiel-dialog.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatListModule} from "@angular/material/list";
import {ConfigService} from "./service/config.service";
import { AdminComponent } from './admin/admin.component';
import { ClientListComponent } from './client-list/client-list.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { AddClientDialogComponent } from './dialog/add-client-dialog/add-client-dialog.component';
import { AgnetAdministratifListComponent } from './agnet-administratif-list/agnet-administratif-list.component';
import { AddAgentDialogComponent } from './dialog/add-agent-dialog/add-agent-dialog.component';
import { EditAgentDialogComponent } from './dialog/edit-agent-dialog/edit-agent-dialog.component';
import { EditClientDialogComponent } from './dialog/edit-client-dialog/edit-client-dialog.component';
import { TechnicienListComponent } from './technicien-list/technicien-list.component';
import { AddTechnicienDialogComponent } from './dialog/add-technicien-dialog/add-technicien-dialog.component';
import { EditTechnicienDialogComponent } from './dialog/edit-technicien-dialog/edit-technicien-dialog.component';
import { AddSuperviseurDialogComponent } from './dialog/add-superviseur-dialog/add-superviseur-dialog.component';
import { EditSuperviseurDialogComponent } from './dialog/edit-superviseur-dialog/edit-superviseur-dialog.component';
import { SuperviseurListComponent } from './superviseur-list/superviseur-list.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CheckListDetailComponent,
    DepenseComponent,
    AjoutDepenseDialogComponent,
    AddSousCategorieDialogComponent,
    AddSoftwareDialogComponent,
    AddMaterielDialogComponent,
    AdminComponent,
    ClientListComponent,
    AddClientDialogComponent,
    AgnetAdministratifListComponent,
    AddAgentDialogComponent,
    EditAgentDialogComponent,
    EditClientDialogComponent,
    TechnicienListComponent,
    AddTechnicienDialogComponent,
    EditTechnicienDialogComponent,
    AddSuperviseurDialogComponent,
    EditSuperviseurDialogComponent,
    SuperviseurListComponent
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
        MatListModule,
        MatPaginatorModule
    ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: AppConfigurationFactory,
      deps: [ConfigService,HttpClient], multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function AppConfigurationFactory(
  appConfig: ConfigService) {
  return () => appConfig.load();
}
