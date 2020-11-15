import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Trip} from "./trip.model";
import {Observable} from "rxjs";
import {TripService} from "./trip.service";

@Injectable({providedIn : "root"})
export class TripsResolverService implements Resolve<Trip[]>{
  constructor(private tripService: TripService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Trip[]> | Promise<Trip[]> | Trip[] {
    return this.tripService.getTrips();
  }

}
