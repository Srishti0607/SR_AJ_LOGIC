import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtotalsAccordianComponent } from './subtotals-accordian.component';

describe('SubtotalsAccordianComponent', () => {
  let component: SubtotalsAccordianComponent;
  let fixture: ComponentFixture<SubtotalsAccordianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtotalsAccordianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtotalsAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
