import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTextareaFormComponent } from './template-textarea-form.component';

describe('TemplateTextareaFormComponent', () => {
  let component: TemplateTextareaFormComponent;
  let fixture: ComponentFixture<TemplateTextareaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateTextareaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateTextareaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
