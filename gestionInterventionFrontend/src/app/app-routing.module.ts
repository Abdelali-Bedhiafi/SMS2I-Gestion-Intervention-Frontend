import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {CheckListDetailComponent} from "./check-list-detail/check-list-detail.component";
import { DepenseComponent } from './depense/depense.component';
import {AdminComponent} from "./admin/admin.component";


const routes: Routes = [
  { path:"home", component: HomeComponent },
  { path:"checkListDetail/:id", component:CheckListDetailComponent },
  { path:"depense/:id", component: DepenseComponent },
  { path:"admin", component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
