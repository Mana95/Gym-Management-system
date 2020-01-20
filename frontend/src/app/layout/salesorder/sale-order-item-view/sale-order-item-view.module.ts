import { SaleOrderItemViewComponent } from './sale-order-item-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleOrderItemViewRoutingModule } from './sale-order-item-view-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SaleOrderItemViewComponent],
  imports: [
    CommonModule ,SaleOrderItemViewRoutingModule ,NgbModule
  ]
})
export class SaleOrderItemViewModule { }
