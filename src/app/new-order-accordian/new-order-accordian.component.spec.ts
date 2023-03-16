import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderAccordianComponent } from './new-order-accordian.component';

describe('NewOrderAccordianComponent', () => {
  let component: NewOrderAccordianComponent;
  let fixture: ComponentFixture<NewOrderAccordianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOrderAccordianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOrderAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
