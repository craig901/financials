import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroupComponent } from './form-group.component';

describe('FormGroupComponent', () => {
  let component: FormGroupComponent;
  let fixture: ComponentFixture<FormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show TestTitle', () => {
    const TestTitle = 'TestTitle';
    component.title = TestTitle;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('label').innerText).toEqual(TestTitle);
  });

  it('should show TestFor', () => {
    const TestFor = 'TestFor';
    component.for = TestFor;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('label').getAttribute('for')).toEqual(TestFor);
  });

  it('should show required span', () => {
    component.required = true;
    fixture.detectChanges();
    const Ele = fixture.nativeElement.querySelector( 'span' );
    expect(true).toBeTruthy();
  });

  it('should not show required span', () => {
    component.required = false;
    fixture.detectChanges();
    const Ele = fixture.nativeElement.querySelector( 'span' );
    expect(false).toBeFalsy();
  });

});
