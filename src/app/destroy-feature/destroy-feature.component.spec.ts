import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestroyFeatureComponent } from './destroy-feature.component';

describe('DestroyFeatureComponent', () => {
  let component: DestroyFeatureComponent;
  let fixture: ComponentFixture<DestroyFeatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestroyFeatureComponent]
    });
    fixture = TestBed.createComponent(DestroyFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
