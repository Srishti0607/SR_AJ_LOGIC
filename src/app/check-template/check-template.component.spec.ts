import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTemplateComponent } from './check-template.component';

describe('CheckTemplateComponent', () => {
  let component: CheckTemplateComponent;
  let fixture: ComponentFixture<CheckTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
