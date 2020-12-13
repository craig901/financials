import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [ CardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have title Transactions dashboard', () => {
    const DashboardTitle = 'Dashboard';
    component.title = DashboardTitle;
    fixture.detectChanges();
    expect( fixture.nativeElement.querySelector('h1').innerHTML ).toContain( DashboardTitle );
  });

});
