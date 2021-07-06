import { Component, Inject, OnInit } from '@angular/core';

/**
 * Angular Material
 */
 import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 import { ValueConstant } from 'src/app/constants/value.constant';
import { ErrorAPI, ErrorInternal } from 'src/app/interfaces/error.interface';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ErrorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {error : ErrorAPI | ErrorInternal}
  ) { }

  ngOnInit(): void {

  }

}
