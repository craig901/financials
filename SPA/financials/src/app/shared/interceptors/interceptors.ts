import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
//import { UrlInterceptor } from './url.interceptor';
//import { RefreshTokenInterceptor } from './refresh-token.interceptor';
import { LoaderInterceptor } from './loader.interceptor';
import {ErrorInterceptor} from "./error.interceptor";
//import {ErrorInterceptor} from "./error.interceptor";

/** interceptor providers in outside-in order */
export const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  //{ provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  //{ provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
];
