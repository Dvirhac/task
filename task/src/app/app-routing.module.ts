import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TripMainComponent} from "./trip-main/trip-main.component";
import {TripListComponent} from "./trip-main/trip-list/trip-list.component";
import {LoginComponent} from "./login/login.component";
import {TripsResolverService} from "./trips-resolver.service";



const routes: Routes = [
  {path:'', redirectTo: 'trip-main', pathMatch: 'full'},
  {path: 'trip-main', component: TripMainComponent},
  {path: 'trips-table', component: TripListComponent , resolve: {trips: TripsResolverService}},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
