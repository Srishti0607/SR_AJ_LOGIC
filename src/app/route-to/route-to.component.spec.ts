import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteToComponent } from './route-to.component';

describe('RouteToComponent', () => {
  let component: RouteToComponent;
  let fixture: ComponentFixture<RouteToComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouteToComponent]
    });
    fixture = TestBed.createComponent(RouteToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
