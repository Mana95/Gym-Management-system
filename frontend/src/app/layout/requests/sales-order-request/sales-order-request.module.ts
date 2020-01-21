import { FormModule } from './../../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SalesOrderRequestRoutingModule } from './sales-order-request-routing.module';
import { SalesOrderRequestComponent } from './sales-order-request.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SalesOrderRequestComponent],
  imports: [
    CommonModule , SalesOrderRequestRoutingModule ,ReactiveFormsModule ,FormModule
  ]
})
export class SalesOrderRequestModule { }
