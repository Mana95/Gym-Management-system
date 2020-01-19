import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesOrderCartComponent } from './sales-order-cart.component';
import { SalesOrderCartRoutingModule } from './sale-order-cart-routing.module';

@NgModule({
  declarations: [SalesOrderCartComponent],
 
  imports: [
    CommonModule , SalesOrderCartRoutingModule
  ]
})

export class SalesOrderCartModule { }