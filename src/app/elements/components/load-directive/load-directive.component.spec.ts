import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadDirectiveComponent } from './load-directive.component';

describe('LoadDirectiveComponent', () => {
  let component: LoadDirectiveComponent;
  let fixture: ComponentFixture<LoadDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadDirectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
