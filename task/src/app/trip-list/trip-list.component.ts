import {Component, OnDestroy, OnInit} from '@angular/core';
import {Trip} from "../trip.model";
import {TripService} from "../trip.service";
import {Observable, Subject, Subscription} from "rxjs";
import {FormControl} from "@angular/forms";
import {map, startWith, tap} from "rxjs/operators";

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit, OnDestroy {
  trips : Trip[] = [];
  tripsSub : Subscription;
  trip: Trip [] = []
  searchText: FormControl;
  filteredTrips = new Subject<Trip[]>();
  hasTrip: boolean;
  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.searchText = new FormControl('');
    this.tripsSub = this.tripService.tripsChanged.subscribe( trips => {
      this.trips = trips;
      this.filteredTrips.next(trips);
    });

    this.searchText.valueChanges.subscribe(value => {
      const trips = this.tripService.showByDesc(value);
      this.trips = trips;
      this.filteredTrips.next(trips);
    });
  }


  ngOnDestroy(): void {
    this.tripsSub.unsubscribe();
  }

  onStateClick() {
    this.tripService.sort('state', this.trips);
  }

  onEndDateClicked() {
    this.tripService.sort('startDate', this.trips);
  }

  onStartDateClicked() {
    this.tripService.sort('endDate', this.trips);
  }

}
