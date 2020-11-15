import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {TripService} from "./trip.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-trip-main',
  templateUrl: './trip-main.component.html',
  styleUrls: ['./trip-main.component.css']
})
export class TripMainComponent implements OnInit {

  states : string[] = [];
  filterStates : Observable<string[]>;
  filterStates2 : Subject<string []> = new Subject<string[]>();
  stateString: string = '';
  constructor(private tripService: TripService) {}
  form : FormGroup;
  isTouched: boolean;

  ngOnInit(): void {
    let now = new Date();
    this.form = new FormGroup({
      state: new FormControl('',Validators.required),
      startDate: new FormControl(now,Validators.required),
      endDate :new FormControl(),
      desc: new FormControl(' ')
    });

    this.filterStates2.next(this.states);

    this.tripService.callTrips().subscribe(
      (states: string[]) => {
        this.states = states;
      }
    );

    this.form.get('state').valueChanges.subscribe(value => {
      if (!value) {
        this.filterStates2.next(this.states);
        return;
      }
      const filtered = this._filter(value);
      this.filterStates2.next(filtered);
    })
  }


  onSubmit() {
    console.log(this.form.value)
    this.tripService.addTrip(this.form.value);
    this.form.reset();
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.toLowerCase().includes(filterValue));

  }

}
