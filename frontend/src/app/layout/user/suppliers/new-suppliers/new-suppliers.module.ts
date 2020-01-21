import { NewSuppliersComponent } from './new-suppliers.component';


import { PageHeaderModule } from './../../../../shared/modules/page-header/page-header.module';
import { FormModule } from './../../../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSuppliersRoutingModule } from './new-suppliers-routing.module';

@NgModule({
  declarations: [NewSuppliersComponent],
  imports: [
    CommonModule , NewSuppliersRoutingModule , ReactiveFormsModule ,FormModule
  ]
})
export class NewSuppliersModule { }
