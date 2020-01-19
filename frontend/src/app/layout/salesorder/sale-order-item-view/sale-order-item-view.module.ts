import { SaleOrderItemViewComponent } from './sale-order-item-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleOrderItemViewRoutingModule } from './sale-order-item-view-routing.module';

@NgModule({
  declarations: [SaleOrderItemViewComponent],
  imports: [
    CommonModule ,SaleOrderItemViewRoutingModule
  ]
})
export class SaleOrderItemViewModule { }
