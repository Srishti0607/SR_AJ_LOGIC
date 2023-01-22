import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtotalsRunningtotalsComponent } from './subtotals-runningtotals.component';

describe('SubtotalsRunningtotalsComponent', () => {
  let component: SubtotalsRunningtotalsComponent;
  let fixture: ComponentFixture<SubtotalsRunningtotalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtotalsRunningtotalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtotalsRunningtotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
