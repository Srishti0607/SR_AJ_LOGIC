import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputListComponentComponent } from './input-list-component.component';

describe('InputListComponentComponent', () => {
  let component: InputListComponentComponent;
  let fixture: ComponentFixture<InputListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputListComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
