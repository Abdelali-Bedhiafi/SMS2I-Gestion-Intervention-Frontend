import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {CheckListDetailComponent} from "./check-list-detail/check-list-detail.component";


const routes: Routes = [
  { path:"home", component: HomeComponent },
  { path:"checkListDetail/:id", component:CheckListDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
