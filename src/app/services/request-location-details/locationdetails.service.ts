
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

  public getLocationDetails(locationId: string): Observable<LocationDetails> {
         const uriPath = `location/${locationId}`;

         return new Observable((observer) => {
                const URL = `${URLconstant.WeatherApiBaseUrl}${uriPath}`;
                this._http.get<any>(URL)
                  .pipe(catchError(err => {throw new Error('API is not responding')}))
                  .subscribe((data) => {
                      this.validateResponseForError(data) ? (() => {
                      const { consolidated_weather } = data;
                      observer.next(consolidated_weather);
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
