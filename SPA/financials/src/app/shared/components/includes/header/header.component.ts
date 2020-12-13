import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/api/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {

    const nav = document.getElementById('nav');
    const burger = document.getElementById('menu-toggle');
    burger.addEventListener("click", function(e) {
      burger.classList.toggle('open');
      nav.classList.toggle('down');
    }, false);

  }

  clicked() {
    document.getElementById('nav').classList.toggle('down');
    document.getElementById('menu-toggle').classList.toggle('open');
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');
  }

}
