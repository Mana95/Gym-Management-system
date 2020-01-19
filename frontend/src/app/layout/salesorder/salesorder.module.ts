import { NumberDirective } from './../../_directives/numbers-only.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormModule } from './../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SalesOrderRoutingModule } from './salesorder-routing.moduls';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesorderComponent } from './salesorder.component';
import { SaleOrderItemViewComponent } from './sale-order-item-view/sale-order-item-view.component';


@NgModule({
  declarations: [SalesorderComponent, SaleOrderItemViewComponent],
 
  imports: [
    CommonModule , SalesOrderRoutingModule,ReactiveFormsModule,FormModule ,NgbModule
  ]
})
export class SalesorderModule { }
