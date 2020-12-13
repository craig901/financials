import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {IUser} from "./shared/models/entities/IUser";
import {AuthenticationService} from "./shared/services/api/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: IUser;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => this.currentUser = x
    )
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
