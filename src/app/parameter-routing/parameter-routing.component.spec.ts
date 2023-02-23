import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterRoutingComponent } from './parameter-routing.component';

describe('ParameterRoutingComponent', () => {
  let component: ParameterRoutingComponent;
  let fixture: ComponentFixture<ParameterRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterRoutingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParameterRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
