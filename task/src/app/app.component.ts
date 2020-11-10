import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {TripService} from "./trip.service";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  showDropDown= false;
  currentDate = Date.now();
  states : string[] = [];
  filterStates : Observable<string[]>;
  stateString: string = '';
  constructor(private tripService: TripService) {}
  form : FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      state: new FormControl('',Validators.required),
      startDate: new FormControl('',Validators.required),
      endDate :new FormControl(),
      desc: new FormControl()
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

  onTuggleDropDown() {
    this.showDropDown = true;
  }

  /*getSearchValue(){
    return this.tripForm.value.state;
  }*/

  onSubmit() {
    console.log(this.form.value)

    this.tripService.addTrip(this.form.value);
  }

  /*onStateClicked(s: string) {
    this.tripForm.controls.state.setValue(s);
  }*/

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.toLowerCase().includes(filterValue));

  }
}
