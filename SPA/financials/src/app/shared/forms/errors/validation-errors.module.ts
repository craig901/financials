import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ControlErrorClassDirective} from "./control-error-class.directive";
import {ControlErrorContainerDirective} from "./control-error-container.directive";
import {ControlErrorComponent} from "./control-error.component";
import {FormSubmitDirective} from "./form-submit.directive";
import {ControlErrorsDirective} from "./control-error.directive";

const components = [
  ControlErrorsDirective,
  ControlErrorComponent,
  ControlErrorContainerDirective,
  ControlErrorClassDirective,
  FormSubmitDirective
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  entryComponents: [
   ControlErrorComponent
  ],
  exports: [
    components
  ]
})
export class ValidationErrorsModule { }
