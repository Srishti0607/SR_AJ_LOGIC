import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetSalRadioComponent } from './net-sal-radio.component';

describe('NetSalRadioComponent', () => {
  let component: NetSalRadioComponent;
  let fixture: ComponentFixture<NetSalRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetSalRadioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetSalRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
