
import { Injectable } from '@angular/core';

/**
 * Angular Core
*/
import { HttpClient } from "@angular/common/http";

/**
 * RXJS 
 */

import { Observable, of } from 'rxjs';
import { catchError } from "rxjs/operators";

/**
 * APP Constant
 */

import { URLconstant } from 'src/app/constants/url.constant';

/**
 * Interfaces
 */
import { LocationDetails, NoDetailsLocation } from "../../interfaces/location.details.interface";

@Injectable({
  providedIn: 'root'
})
export class LocationdetailsService {

  constructor(
    private _http: HttpClient
  ) { }

  /**
  * @param : locationId 
  * This method will request the detailed location data from weather API
  * based on the locationID received from Location list
  */

  public getLocationDetails(locationId: string) {
         const uriPath = `location/${locationId}`;

         return new Observable((observer) => {
                const URL = `${URLconstant.WeatherApiBaseUrl}${uriPath}`;
                this._http.get<LocationDetails | NoDetailsLocation>(URL)
                  .pipe(catchError(err => of([])))
                  .subscribe((data : LocationDetails | NoDetailsLocation) => {
                      this.validateResponseForError(data) ? (() => {
                      observer.next(data);
                      observer.complete();
                      })() : observer.error('No Details Found for this location');
                });
         }) 
  } 

private validateResponseForError(data: LocationDetails | NoDetailsLocation) {
    // check if the data is of type no details 
    if(this.NoDetailsLocation(data)) {
         return 0;
    }
    return 1;
}

private NoDetailsLocation(data: LocationDetails | NoDetailsLocation): data is NoDetailsLocation {
   return (data as NoDetailsLocation).detail !== undefined;
}


}
