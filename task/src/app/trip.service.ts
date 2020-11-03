import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Trip} from "./trip.model";
import {Subject} from "rxjs";

@Injectable({providedIn: "root"})

export class TripService{
  private url :string =  'https://restcountries.eu/rest/v2/all';
  private currentTrips : Trip [] = [];
  tripsChanged = new Subject<Trip[]>();
  constructor(private http: HttpClient) {
  }
  callTrips()
  {
    return this.http.get
    (this.url).pipe(
      map(responseData =>{
          let states = [];
          let i = 0;
        for (let s of responseData){
            states.push(s['name']);
          }
          return states;
        }

      )
    );
  }

  addTrip(trip: Trip) {
    this.currentTrips.push(trip);
    this.tripsChanged.next(this.currentTrips.slice());
  }
}
