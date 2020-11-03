import {Component, Input, OnInit} from '@angular/core';
import {Trip} from "../../trip.model";
import {TripService} from "../../trip.service";

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent implements OnInit {
  @Input('trip') currentTrip: Trip;

  constructor(private tripService: TripService) { }

  ngOnInit(): void {

  }

}
