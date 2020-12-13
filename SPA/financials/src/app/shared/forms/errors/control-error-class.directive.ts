import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[controlErrorClass]'
})
export class ControlErrorClassDirective {

  constructor( public vcf: ViewContainerRef ) { }

}
