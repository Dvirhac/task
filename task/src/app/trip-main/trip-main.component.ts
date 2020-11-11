import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {TripService} from "../trip.service";
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
  stateString: string = '';
  constructor(private tripService: TripService) {}
  form : FormGroup;

  ngOnInit(): void {
    let now = new Date();
    this.form = new FormGroup({
      state: new FormControl('',Validators.required),
      startDate: new FormControl(now,Validators.required),
      endDate :new FormControl(),
      desc: new FormControl(' ')
    });

    this.tripService.callTrips().subscribe(
      (states: string[]) => {
        this.states = states;
      }
    );

    this.filterStates = this.form.get('state').valueChanges
      .pipe(
        startWith(''),
        map((value: string) => {
          console.log(value)
          return this._filter(value);
        })
      );
  }


  onSubmit() {
    console.log(this.form.value)

    this.tripService.addTrip(this.form.value);
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.toLowerCase().includes(filterValue));

  }

}
