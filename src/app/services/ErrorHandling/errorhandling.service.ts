import { Injectable } from '@angular/core';

/**
 * Angular Material
 */

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ErrorsComponent } from 'src/app/components/errors/errors/errors.component';
import { ValueConstant } from 'src/app/constants/value.constant';
import { ErrorAPI, ErrorInternal } from 'src/app/interfaces/error.interface';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlingService {

  constructor(
    private matDialog: MatDialog
  ) { }

  errorHandling(error: ErrorInternal | ErrorAPI) {
      const dialogRef = this.matDialog.open(ErrorsComponent, {
        width : '400px',
        data: {error}
        });
        
  }
  }

