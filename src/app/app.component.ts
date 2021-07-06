import { Component, Inject } from '@angular/core';

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

/**
 * Angular Material 
 */
 import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ListDetailComponent } from './components/list-detail/list-detail.component';
import { ErrorhandlingService } from './services/ErrorHandling/errorhandling.service';
import { ErrorAPI } from './interfaces/error.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'weather-app';
  public searchValue: string = '';
  public locationList: Array<Location> = [];
  public showSpinner: boolean = false;

  constructor(
    private locationListsService: LocationListsService,
    private locationdetailsService: LocationdetailsService,
    private matDialog: MatDialog,
    private errorhandlingService: ErrorhandlingService
  ) {}

  /**
   * 
   * @param : searchBox - input from the user
   * It will request the data from Location API based on the input from 
   * the user, if there is no input an alert is shown
   */
  public async logForm({searchBox}) {

     if (!searchBox) {
       alert('Please enter a valid city name');
     }
     try {
      // show spinner
      this.showSpinner = true;
      const res: Array<Location> =  await this.locationListsService.getLocationLists(searchBox).toPromise();
      
      //hide spinner
      this.showSpinner = false;
      // empty before another search results loaded
      this.locationList.length = 0;
      this.locationList.push(...res);

     } catch (error) {
      
       const message: ErrorAPI = { Message: error.message, statusCode: 404};
       this.errorhandlingService.errorHandling(message);

       ////hide spinner
       this.showSpinner = false;
     }
  }

  /**
   *  Opening Dialog with details for the selected location
   */
  public async openDetails(locationId: string) {
    try {
      //show spinner
      this.showSpinner = true;

      const response: LocationDetails = await this.locationdetailsService.getLocationDetails(locationId).toPromise();

      //hide spinner
      this.showSpinner = false;

      const dialLogRef = this.matDialog.open(ListDetailComponent, {
        width: '700px',
        data: {response}
      })
    } catch (error) {
        console.error(error);
    }
    
  }

}
