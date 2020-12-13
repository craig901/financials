import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {SharedComponentsModule} from "../../shared/components/shared-components.module";
import {RouterModule} from "@angular/router";
import {NgApexchartsModule} from "ng-apexcharts";


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedComponentsModule,
    NgApexchartsModule
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardModule { }
