import { PageHeaderModule } from 'src/app/shared';
import { FormModule } from './../../form/form.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomersComponent } from './customers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';



@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule, CustomersRoutingModule ,PageHeaderModule , FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomersModule { }
