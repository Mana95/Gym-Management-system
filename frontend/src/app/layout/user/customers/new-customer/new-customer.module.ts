import { SharedModule } from './../../../../shared/shared/shared.module';
import { NewCustomerComponent } from './new-customer.component';
import { FormModule } from './../../../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from 'src/app/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCustomersRoutingModule } from './new-customer-routing.module';

@NgModule({
  declarations: [NewCustomerComponent],
  imports: [
    CommonModule ,NewCustomersRoutingModule ,PageHeaderModule ,ReactiveFormsModule ,FormModule ,SharedModule
  ]
})
export class NewCustomerModule { }
