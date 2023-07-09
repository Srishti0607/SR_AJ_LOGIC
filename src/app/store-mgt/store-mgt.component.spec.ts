import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMgtComponent } from './store-mgt.component';

describe('StoreMgtComponent', () => {
  let component: StoreMgtComponent;
  let fixture: ComponentFixture<StoreMgtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreMgtComponent]
    });
    fixture = TestBed.createComponent(StoreMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
