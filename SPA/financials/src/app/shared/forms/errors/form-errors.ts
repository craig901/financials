import {Injectable} from '@angular/core';
//import {TranslateService} from "@ngx-translate/core";
import {forkJoin, Observable, Subscription} from "rxjs";
import {map, tap} from "rxjs/operators";
//import {IError} from "../../models/contracts/error";

export const defaultErrors = {
  required: `This field is required`,
  minlength: `Expect length`,
  email: `Invalid email address`,
  isoCode: 'Invalid iso code, lowercase and hyphens'
}


@Injectable({
  providedIn: 'root'
})
export class ValidationErrorDefault {

  private isTranslated: boolean = false;
  private defaultErrors = defaultErrors;

  private subscription: Subscription;

  constructor() {
  }

  private translate(): void {
    if( this.isTranslated ) {
      return;
    }
    this.isTranslated = true;
    let translatedErrors$: Array<Observable<string|any>> = [];

    // Object.keys( this.defaultErrors ).forEach( (v)=> {
    //   //const message$ = this.translateService.get( "validationMessages." + v ).pipe( map( message => {
    //
    //     // let error  = {} as IError;
    //     // error.key = v;
    //     // error.message = message;
    //     // return error;
    //
    //     return {
    //       key: v,
    //       message: message
    //     }
    //   }));
    //   translatedErrors$.push( message$ );
    // });

    this.subscription = forkJoin( translatedErrors$ )
      .pipe(
        tap( items => {
          items.forEach( item => {
            if( item.key && item.message )
              this.defaultErrors[ item.key ] = item.message;
          })
        })
      )
      .subscribe();

  }

  get( key: string, ...params ): string {
    return this.defaultErrors[ key ];
  }

}

