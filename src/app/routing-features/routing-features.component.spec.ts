import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingFeaturesComponent } from './routing-features.component';

describe('RoutingFeaturesComponent', () => {
  let component: RoutingFeaturesComponent;
  let fixture: ComponentFixture<RoutingFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutingFeaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutingFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
