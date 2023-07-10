import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTemplateSyntaxComponent } from './new-template-syntax.component';

describe('NewTemplateSyntaxComponent', () => {
  let component: NewTemplateSyntaxComponent;
  let fixture: ComponentFixture<NewTemplateSyntaxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTemplateSyntaxComponent]
    });
    fixture = TestBed.createComponent(NewTemplateSyntaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
