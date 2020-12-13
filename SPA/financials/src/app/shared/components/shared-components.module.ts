import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./includes/header/header.component";
import {CardComponent} from "./includes/card/card.component";
import {RouterModule} from "@angular/router";
import { LoaderComponent } from './includes/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PaginationComponent } from './includes/pagination/pagination.component';
import { FormGroupComponent } from './form/form-group/form-group.component';
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from '@angular/material/input';
import {NgApexchartsModule} from "ng-apexcharts";
import {NgxSelectModule} from "ngx-select-ex";

const components = [
  HeaderComponent,
  CardComponent,
  LoaderComponent,
  PaginationComponent,
  FormGroupComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    NgApexchartsModule,
    NgxSelectModule
  ],
  exports: [
    components,
    MatDatepickerModule
  ],
  providers: [
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: []
})
export class SharedComponentsModule { }

/*

 imports: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MatDatepickerModule,
  ],
 */
