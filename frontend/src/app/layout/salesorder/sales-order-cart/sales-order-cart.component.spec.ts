import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderCartComponent } from './sales-order-cart.component';

describe('SalesOrderCartComponent', () => {
  let component: SalesOrderCartComponent;
  let fixture: ComponentFixture<SalesOrderCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
