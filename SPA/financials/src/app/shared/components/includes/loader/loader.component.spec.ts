import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import {By} from "@angular/platform-browser";
import {LoaderService} from "../../../services/app/loader.service";
import {of} from "rxjs";
import {DebugElement} from "@angular/core";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {HeaderComponent} from "../header/header.component";
// import {By} from "protractor";

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let service: LoaderService;

  beforeEach(async(() => {

    // Create a fake TwainService object with a `getQuote()` spy
    const loaderService = jasmine.createSpyObj('LoaderService', ['show', 'hide']);
    // Make the spy return a synchronous Observable with the test data
    let loadSpy = loaderService.show.and.returnValue( of( true ) );
    const hideSpy = loaderService.hide.and.returnValue( of(false) );

    TestBed.configureTestingModule({
      declarations: [ LoaderComponent, MatProgressSpinner, HeaderComponent ],
      providers: [ { provide: LoaderService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    service = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loader should not be visible', () => {
    expect( fixture.nativeElement.querySelector('.spinner') ).toBeNull();
  });

  it('loader should be visible', () => {
    const loaderService = fixture.debugElement.injector.get( LoaderService );
    loaderService.show();
    fixture.detectChanges();
    const element: DebugElement = fixture.debugElement;
    const overlay = element.query( By.css( '.spinner' ) );
    expect( overlay ).toBeTruthy();
  });

});
