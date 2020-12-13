import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../../../shared/services/api/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(600 )
      ]),
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  /**
   * The login form
   */
  loginForm: FormGroup;

  /**
   * Loading
   */
  loading: boolean = false;

  /**
   * Submitted
   */
  submitted: boolean = false;

  /**
   * Return URL
   */
  returnUrl: string;

  /**
   * Login subscription
   */
  subscription: Subscription;

  /**
   * Constructor
   * @param formBuilder
   * @param route
   * @param router
   * @param authenticationService
   * @param snackBar
   */
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    // redirect home if already logged in
    if( this.authenticationService.currentUserValue )
    {
      this.router.navigate(['/dashboard']);
    }
  }

  /**
   * Init
   */
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [ '', Validators.required ],
      password: [ '', Validators.required ]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  /**
   * Destroy
   */
  ngOnDestroy() {
    if( this.subscription )
      this.subscription.unsubscribe();
  }

  /**
   * Form controls getter
   */
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Submit method
   */
  onSubmit() {
    this.submitted = true;

    if( this.loginForm.invalid ) {
      return;
    }

    this.loading = true;
    this.subscription = this.authenticationService.login( {
      'email': this.loginForm.get( 'email' ).value,
      'password': this.loginForm.get( 'password' ).value
      })
      .pipe( first() )
      .subscribe(
        data => {
          this.router.navigate( [ this.returnUrl ] );
        },
        errorResponse => {
          this.snackBar.open( errorResponse, 'error', {
            duration: 3000
          });
          this.loading = false;
        }
      )
  }

}
