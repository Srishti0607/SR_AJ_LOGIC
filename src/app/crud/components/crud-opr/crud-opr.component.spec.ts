import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudOprComponent } from './crud-opr.component';

describe('CrudOprComponent', () => {
  let component: CrudOprComponent;
  let fixture: ComponentFixture<CrudOprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudOprComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudOprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
