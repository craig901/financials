import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services/api/authentication.service";
import {IUser} from "../models/entities/IUser";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const ignoreUrls = [
      'locales/'
    ];
    const url = request.url;
    if( ignoreUrls.find( u => url.indexOf( u ) >= 0 ) ) {
      return next.handle(request);
    }

    const currentUser: IUser = this.authService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    if (isLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }
}

