import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleOrderItemViewComponent } from './sale-order-item-view.component';

describe('SaleOrderItemViewComponent', () => {
  let component: SaleOrderItemViewComponent;
  let fixture: ComponentFixture<SaleOrderItemViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleOrderItemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleOrderItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
