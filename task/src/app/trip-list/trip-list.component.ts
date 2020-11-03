import {Component, OnDestroy, OnInit} from '@angular/core';
import {Trip} from "../trip.model";
import {TripService} from "../trip.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit, OnDestroy {
  trips : Trip[] = [];
  tripsSub : Subscription;
  constructor(private tripService: TripService) { }
  trip: Trip [] = []
  ngOnInit(): void {
    this.tripsSub = this.tripService.tripsChanged.subscribe(
      (trips: Trip[]) => {
        this.trips = trips;
      }
    );
  }

  ngOnDestroy(): void {
    this.tripsSub.unsubscribe();
  }
}
