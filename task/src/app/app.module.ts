import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripDetailComponent } from './trip-list/trip-detail/trip-detail.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { TripListComponent } from './trip-list/trip-list.component';


@NgModule({
  declarations: [
    AppComponent,
    TripDetailComponent,
    SearchFilterPipe,
    TripListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
