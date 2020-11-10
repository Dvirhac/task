import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Trip} from "./trip.model";
import {Observable, Subject} from "rxjs";
@Injectable({providedIn: "root"})

export class TripService{
  private url :string =  'https://restcountries.eu/rest/v2/all';
  currentTrips : Trip [] = [];
  tripsChanged = new Subject<Trip[]>();
  constructor(private http: HttpClient) {}
  callTrips()
  {
    return this.http.get
    (this.url).pipe(
      map(responseData =>{
          let states = [];
          let i = 0;
          // @ts-ignore
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

  sort(compareBy: string, trips: Trip[]) : void{
    switch (compareBy){
      case 'state':
        trips.sort((a, b) => {
          return a.state > b.state? 1: -1;
        });
        break;
      case 'startDate':
       trips.sort((a, b) => {
          return a.startDate > b.startDate? 1: -1;
        });
        break;
      case 'endDate':
       trips.sort((a, b) => {
          return a.endDate > b.endDate? 1: -1;
        });
        break;
    }
    this.tripsChanged.next(trips.slice());
  }

  showByDesc(prefix: string) : Trip[] {
    const fillerValue = prefix.toLowerCase()
    let a = this.currentTrips.filter(value =>  value.desc.toLowerCase().includes(fillerValue))
    console.log(a);
    return a;
  }
}
