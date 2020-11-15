import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TripMainComponent} from "./trip-main/trip-main.component";
import {TripListComponent} from "./trip-main/trip-list/trip-list.component";
import {AuthComponent} from "./auth/auth.component";
import {TripsResolverService} from "./trip-main/trips-resolver.service";
import {AuthGuard} from "./auth/auth.guard";



const routes: Routes = [
  {path:'', redirectTo: 'trip-main', pathMatch: 'full'},
  {path: 'trip-main', component: TripMainComponent, canActivate: [AuthGuard]},
  {path: 'trips-table', component: TripListComponent , resolve: {trips: TripsResolverService}},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
