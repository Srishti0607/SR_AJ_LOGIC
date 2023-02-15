import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehSubComponent } from './beh-sub.component';

describe('BehSubComponent', () => {
  let component: BehSubComponent;
  let fixture: ComponentFixture<BehSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BehSubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BehSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
