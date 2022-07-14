import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { HomeComponent } from './home/home.component';

=======
import { TestComponent } from './test/test.component';
import { FormsModule } from '@angular/forms';
>>>>>>> e80cb01766898cf5d6948010333f1ecaabbb1c77

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    HomeComponent,
  
=======
    TestComponent
>>>>>>> e80cb01766898cf5d6948010333f1ecaabbb1c77
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
