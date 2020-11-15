import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { TripListComponent } from './trip-main/trip-list/trip-list.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TripMainComponent } from './trip-main/trip-main.component';
import {AuthComponent} from "./auth/auth.component";
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";


@NgModule({
  declarations: [
    AppComponent,
    SearchFilterPipe,
    TripListComponent,
    HeaderComponent,
    FooterComponent,
    TripMainComponent,
    AuthComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
