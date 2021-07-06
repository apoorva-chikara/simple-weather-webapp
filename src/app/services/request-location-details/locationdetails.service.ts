
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

  /**
   * 
   * @param data - check if the data is present or not
   * @returns 0 | 1
   *   if the function returns 0, it means there is no data form the API for the
   *   user input data in the form else it will retun 1 stating the data is valid.
   *  
   */
private validateResponseForError(data: LocationDetails | NoDetailsLocation) : number {
    // check if the data is of type no details 
    if(this.NoDetailsLocation(data)) {
         return 0;
    }
    return 1;
}

/**
 * 
 * @param data 
 * @returns true | false
 * it check whether the passed data is of type LocationDetails or NoDetailsLocation
 */
private NoDetailsLocation(data: LocationDetails | NoDetailsLocation): data is NoDetailsLocation {
   return (data as NoDetailsLocation).detail !== undefined;
}


}
