import { Component, OnInit, Inject } from '@angular/core';

/**
 * Angular Material
 */

 import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ValueConstant } from 'src/app/constants/value.constant';

/**
 * Interface Import
 */
import { LocationDetails } from 'src/app/interfaces/location.details.interface';
import { ErrorhandlingService } from 'src/app/services/ErrorHandling/errorhandling.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
 
  //It will set the date in the component
  public details: LocationDetails;

  constructor(
    public dialogRef: MatDialogRef<ListDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private errorhandlingService: ErrorhandlingService
  ) { }

  ngOnInit(): void {
    this.addDatatoDetails(this.data?.response[0]);
  }
 
  /**
   * Print the current date weather details on Init
   */
  private addDatatoDetails(data: LocationDetails) {
        data = this.getTimeDayYear(data);
        this.details = data;
  }


 /**
 * Adding time, day and year from the current data details
 */
  private getTimeDayYear(data: LocationDetails) {
         const date = new Date(data.applicable_date),
               Day = ValueConstant.WeekDays[date.getDay()],
               Month = ValueConstant.Months[date.getMonth()],
               Year = date.getFullYear();
               
         data.Day = Day, data.Month = Month, data.Year = Year;
         data.currentTime = this.generateCurrentTime();
         return data

  }

  /**
   * Create time object when the data is shown on the view
   */

  private generateCurrentTime() {
    const today = new Date(),
          h = today.getHours(),
          m = today.getMinutes(),
          s = today.getSeconds();
     return `${h}:${m}:${s}`;
  }

 /**
  * Get previous date data if there is no previous
  * date it won't do anything
  */
  public prevDateData(data: LocationDetails) {
    const getIndex = this.getIndexOfCurrentData(data);

    if (getIndex > 0) {
       this.addDatatoDetails(this.data.response[getIndex-1]);
    }
    else {
      this.errorhandlingService.errorHandling({Message: "No Previous Date"})
    }
  }


  /**
  * Get next date data if there is no next
  * date it won't do anything
  */
   public nextDateData(data: LocationDetails) {
    const getIndex = this.getIndexOfCurrentData(data);

    if (getIndex < this.data.response.length - 1) {
       this.addDatatoDetails(this.data.response[getIndex+1]);
    }
    else {
      this.errorhandlingService.errorHandling({Message: "No Next Date"})
    }
  }

// It will help to get the current indexing of the current data on view
  private getIndexOfCurrentData(data: LocationDetails) {
      const index = this.data.response.findIndex(el => data.id === el.id);
      return index;
  }

  /**
   * It will fixed the decimal upto one point 
   */
  public fixDecimal(value: number) {
     return value.toFixed(1);
  }
}
