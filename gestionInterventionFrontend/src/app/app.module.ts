import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

<<<<<<< HEAD
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
=======
import { FormsModule } from '@angular/forms';

import { OrdreMissionModule } from './ordre-mission/ordre-mission.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
>>>>>>> 9687839287c70793c553634f06ce75531de02105

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    HomeComponent
=======
    HomeComponent,
>>>>>>> 9687839287c70793c553634f06ce75531de02105
  ],
  imports: [
    BrowserModule,
    FormsModule,
<<<<<<< HEAD
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
=======
    MatNativeDateModule,
    OrdreMissionModule,
    MatDatepickerModule,
>>>>>>> 9687839287c70793c553634f06ce75531de02105
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
