import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationService} from "../../../shared/services/api/authentication.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ActivatedRouteStub} from "../../../testing/activated-route-stub";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const authServiceStub = jasmine.createSpyObj(
    'AuthenticationService',
    ['login'],
    [ 'currentUserValue' ]
  );
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const routeStub = new ActivatedRouteStub();
  const snackBarStub = jasmine.createSpyObj('MatSnackBar', ['open']);
  const user = {
    email: 'joe@acme.com',
    password: 'abc123'
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 1,
              },
              queryParams: [ 'returnUrl' ]
            },
          },
        },
        { provide: Router, useValue: routerSpy },
        { provide: AuthenticationService, useValue: authServiceStub },
        { provide: MatSnackBar, useValue: snackBarStub }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function updateForm(email, password) {
    component.loginForm.controls['email'].setValue(email);
    component.loginForm.controls['password'].setValue(password);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loading).toBeFalsy();
    expect(component.submitted).toBeFalsy();
    expect(component.returnUrl).toBeTruthy();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('submitted should be true when onSubmit()', () => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('form value should update from when u change the input', (() => {
    updateForm(user.email, user.password);
    expect(component.loginForm.value).toEqual(user);
  }));

  it('Form invalid should be true when form is invalid', (() => {
    updateForm(user.email, user.password);
    expect(component.loginForm.invalid).toBeFalsy();
  }));

});
