import { Component } from '@angular/core';

/**
 * Services Import
 */
import { LocationListsService } from "./services/request-location/location-lists.service";
import { LocationdetailsService } from "./services/request-location-details/locationdetails.service";

/**
 * Interfaces Import
 */
import { Location } from "./interfaces/locations.interface";
import { LocationDetails, NoDetailsLocation } from "./interfaces/location.details.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weather-app';
  public searchValue: string = '';
  public locationList: Array<Location> = [];

  constructor(
    private locationListsService: LocationListsService,
    private locationdetailsService: LocationdetailsService
  ) {}

  public async logForm({searchBox}) {
    console.log(searchBox);
     if (!searchBox) {
       alert('Please enter a valid city name');
     }
     try {
      const res: Array<Location> =  await this.locationListsService.getLocationLists(searchBox).toPromise();

      // empty before another search results loaded
      this.locationList.length = 0;
      this.locationList.push(...res);
      console.log(res);
     } catch (error) {
       console.error(error);
     }
  }

  /**
   *  Opening Dialog with details
   */
  public async openDetails(locationId: string) {
    try {
      const res = await this.locationdetailsService.getLocationDetails(locationId).toPromise();
      console.log(res);
    } catch (error) {
        console.error(error)
    }
    
  }

}
