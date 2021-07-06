import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/**
 * Angular core Modules
 */

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

/**
 * Angular Materials imports here
 */

import { MatCardModule } from "@angular/material/card";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


/**
 * Custom Components
 */

 import { ListDetailComponent } from './components/list-detail/list-detail.component';
import { ErrorsComponent } from './components/errors/errors/errors.component';

@NgModule({
  declarations: [
    AppComponent,
    ListDetailComponent,
    ErrorsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    FlexLayoutModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: MatDialogRef, useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA, useValue :{}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
