import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {LoaderService} from "../services/app/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    public loaderService: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const ignoreUrls = [
      '/auth/logout'
    ];

    const url = req.url;
    if( ignoreUrls.find( u => url.indexOf( u ) >= 0 ) ) {
      return next.handle(req);
    }

    this.loaderService.show();
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
