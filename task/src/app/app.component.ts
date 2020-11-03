import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TripService} from "./trip.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  showDropDown= false;
  tripForm: FormGroup;
  currentDate = Date.now();
  states = [];
  state: string = '';
  constructor(private tripService: TripService) {}


  ngOnInit(): void {

    this.tripForm = new FormGroup(
      {
        'state': new FormControl('',Validators.required),
        'startDate': new FormControl(''),
        'endDate': new FormControl('')
      }
    );
    this.tripService.callTrips().subscribe(
      (states: string[]) => {
        this.states = states;
      }
    )
  }

  onTuggleDropDown() {
    this.showDropDown = true;
  }

  getSearchValue(){
    return this.tripForm.value.state;
  }

  onSubmit() {
    this.tripService.addTrip(this.tripForm.value);
  }

  onStateClicked(s: string) {
    this.tripForm.controls.state.setValue(s);
  }
}
