import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {TransactionsRoutingModule} from "./transactions-routing.module";
import {SharedComponentsModule} from "../../shared/components/shared-components.module";
import { FiltersComponent } from './list/filters/filters.component';
import { SortByComponent } from './list/sort-by/sort-by.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ValidationErrorsModule} from "../../shared/forms/errors/validation-errors.module";
import {NgxSelectModule} from "ngx-select-ex";

@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    FiltersComponent,
    SortByComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    ValidationErrorsModule,
    NgxSelectModule
  ]
})
export class TransactionsModule { }
