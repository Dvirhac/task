import {Component, OnDestroy, OnInit} from '@angular/core';
import {Trip} from "../../trip.model";
import {TripService} from "../../trip.service";
import {Subscription} from "rxjs";
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Data} from "@angular/router";

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit, OnDestroy {
  trips : Trip[] = [];
  tripsSub : Subscription;
  searchText: FormControl;

  constructor(private tripService: TripService , private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.searchText = new FormControl('');
    this.route.data.subscribe(
      (data: Data) => {
        this.trips = data['trips'];
        this.tripService.resetFilteredStates();
    });

    this.tripsSub = this.tripService.tripsChanged.subscribe( trips => {
      this.trips = trips;
    });

    this.searchText.valueChanges.subscribe(value => {
      this.tripService.getFilteredStates(value);
    });
  }


  ngOnDestroy(): void {
    this.tripsSub.unsubscribe();
  }

  onStateClick() {
    this.tripService.sort('state');
  }

  onEndDateClicked() {
    this.tripService.sort('startDate');
  }

  onStartDateClicked() {
    this.tripService.sort('endDate');
  }

}
