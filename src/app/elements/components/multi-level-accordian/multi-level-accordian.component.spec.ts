import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLevelAccordianComponent } from './multi-level-accordian.component';

describe('MultiLevelAccordianComponent', () => {
  let component: MultiLevelAccordianComponent;
  let fixture: ComponentFixture<MultiLevelAccordianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiLevelAccordianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiLevelAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
