import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorisedComponent } from './authorised.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('AuthorisedComponent', () => {
  let component: AuthorisedComponent;
  let fixture: ComponentFixture<AuthorisedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorisedComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
