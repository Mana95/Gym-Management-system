import { SuppliersComponent } from './suppliers.component';
import { FormModule } from './../../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from 'src/app/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { EditSuplliersComponent } from './edit-suplliers/edit-suplliers.component';
import { NewSuppliersComponent } from './new-suppliers/new-suppliers.component';

@NgModule({
  declarations: [SuppliersComponent],
  imports: [
    CommonModule, SuppliersRoutingModule ,PageHeaderModule , ReactiveFormsModule,FormModule
  ]
})
export class SuppliersModule { }
