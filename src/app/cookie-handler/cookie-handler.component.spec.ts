import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieHandlerComponent } from './cookie-handler.component';

describe('CookieHandlerComponent', () => {
  let component: CookieHandlerComponent;
  let fixture: ComponentFixture<CookieHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookieHandlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookieHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
