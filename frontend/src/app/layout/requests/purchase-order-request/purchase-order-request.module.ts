import { ReactiveFormsModule } from '@angular/forms';
import { PurchaseOrderRequestRoutingModule } from './purchase-order-request-routing.module';
import { PurchaseOrderRequestComponent } from './purchase-order-request.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PurchaseOrderRequestComponent],
  imports: [
    CommonModule ,PurchaseOrderRequestRoutingModule ,ReactiveFormsModule
  ]
})
export class PurchaseOrderRequestModule { }
