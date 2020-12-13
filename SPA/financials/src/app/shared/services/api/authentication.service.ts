import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';
import {IUser} from "../../models/entities/IUser";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   * The current user subject
   * @private
   */
  private currentUserSubject: BehaviorSubject<IUser>;

  /**
   * The current user observable
   */
  public currentUser: Observable<IUser>;

  /**
   * Constructor
   * @param http
   */
  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Current user getter
   */
  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  /**
   * Login method
   * @param request
   */
  login( request ) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, {email:request.email,password:request.password} )
      .pipe(
        map(
          user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          }
        )
      );
  }

  /**
   * Logout method
   */
  logout() {
    this.http.post<any>( `${environment.apiUrl}/auth/logout`, {} ).subscribe(
      res => {
        console.log( res );
      }
    );
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
