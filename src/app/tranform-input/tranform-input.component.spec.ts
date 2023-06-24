import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranformInputComponent } from './tranform-input.component';

describe('TranformInputComponent', () => {
  let component: TranformInputComponent;
  let fixture: ComponentFixture<TranformInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranformInputComponent]
    });
    fixture = TestBed.createComponent(TranformInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
