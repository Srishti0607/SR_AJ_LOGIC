import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalBehSubComponent } from './signal-beh-sub.component';

describe('SignalBehSubComponent', () => {
  let component: SignalBehSubComponent;
  let fixture: ComponentFixture<SignalBehSubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignalBehSubComponent]
    });
    fixture = TestBed.createComponent(SignalBehSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
