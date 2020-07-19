import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailModalComponent } from './invoice-detail-modal.component';

describe('InvoiceDetailModalComponent', () => {
  let component: InvoiceDetailModalComponent;
  let fixture: ComponentFixture<InvoiceDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
