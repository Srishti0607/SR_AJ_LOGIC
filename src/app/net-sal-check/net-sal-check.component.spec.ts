import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetSalCheckComponent } from './net-sal-check.component';

describe('NetSalCheckComponent', () => {
  let component: NetSalCheckComponent;
  let fixture: ComponentFixture<NetSalCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetSalCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetSalCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
