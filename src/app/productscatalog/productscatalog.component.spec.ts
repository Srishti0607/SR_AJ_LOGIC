import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductscatalogComponent } from './productscatalog.component';

describe('ProductscatalogComponent', () => {
  let component: ProductscatalogComponent;
  let fixture: ComponentFixture<ProductscatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductscatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductscatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
