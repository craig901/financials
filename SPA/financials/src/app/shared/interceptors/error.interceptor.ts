import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthenticationService} from "../services/api/authentication.service";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor( private authenticationService: AuthenticationService ) {}

  intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle( req ).pipe(
      catchError( errorResponse => {
        console.log( errorResponse, errorResponse.error.errors );
        const error = errorResponse.error.message || errorResponse.statusText;
        return throwError( error );
      })
    )
  }
}
