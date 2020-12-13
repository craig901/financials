














import { Directive, Optional, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Input, Host, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import {ValidationErrorDefault} from './form-errors';
import { ControlErrorComponent } from './control-error.component';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { FormSubmitDirective } from './form-submit.directive';
import { merge, EMPTY, Observable, Subscription } from 'rxjs';
import { ControlErrorClassDirective } from './control-error-class.directive';
import { FormGroupComponent } from '../../components/form/form-group/form-group.component';
import { mapTo } from 'rxjs/operators';

@Directive({
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnDestroy {
  ref: ComponentRef<ControlErrorComponent>;
  container: ViewContainerRef;
  submit$: Observable<Event>;
  @Input() customErrors = {};
  @Input() preventDisplayingErrors = false;

  subscription: Subscription;

  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    @Optional() controlErrorContainer: ControlErrorContainerDirective,
    @Optional() @Host() private controlErrorClass: ControlErrorClassDirective,
    private errors: ValidationErrorDefault,
    @Optional() private form: FormSubmitDirective,
    private controlDir: NgControl) {

    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
    this.submit$ = this.form ? this.form.submit$ : EMPTY;

  }

  ngOnInit() {
    //console.log( 'ControlErrorsDirective' );
    this.subscription = merge(
      this.submit$.pipe( mapTo( 'submit' )),
      this.control.valueChanges.pipe( mapTo( 'valueChanges' )),
    ).subscribe((v) => this.handleValueChange( v === 'submit' ) );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  get control() {
    return this.controlDir.control;
  }

  handleValueChange( isSubmitting: boolean ) {
    const controlErrors = this.control.errors;
    if (controlErrors && (!this.control.pristine || isSubmitting ) ) {
      const firstKey = Object.keys(controlErrors)[0];
      const getError = this.errors.get(firstKey);
      if (this.customErrors[firstKey] || getError) {
        const text = this.customErrors[firstKey] || this.errors.get(firstKey, controlErrors[firstKey]);
        this.setError(text);
      } else {
        this.setError(null);
      }
    } else {
      this.setError(null);
    }
  }

  setError(text: string) {
    if( !this.preventDisplayingErrors && this.container ) {
      if (!this.ref) {
        const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
        this.ref = this.container.createComponent(factory);
      }

      this.ref.instance.text = text;
    }

    if (this.controlErrorClass &&
      this.controlErrorClass.vcf &&
      this.controlErrorClass.vcf['_data'] &&
      this.controlErrorClass.vcf['_data'].componentView &&
      this.controlErrorClass.vcf['_data'].componentView.component.constructor.name === 'FormGroupComponent'
    ) {
      let formGroupComponent: FormGroupComponent = this.controlErrorClass.vcf['_data'].componentView.component as FormGroupComponent;
      formGroupComponent.hasError = text ? true : false;
    }
  }

}
