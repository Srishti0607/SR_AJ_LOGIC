import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPipeComponent } from './load-pipe.component';

describe('LoadPipeComponent', () => {
  let component: LoadPipeComponent;
  let fixture: ComponentFixture<LoadPipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadPipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
