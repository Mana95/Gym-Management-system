import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderRequestComponent } from './sales-order-request.component';

describe('SalesOrderRequestComponent', () => {
  let component: SalesOrderRequestComponent;
  let fixture: ComponentFixture<SalesOrderRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
