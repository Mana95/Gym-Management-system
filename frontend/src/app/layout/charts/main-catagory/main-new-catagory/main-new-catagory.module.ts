import { FormModule } from './../../../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MainNewCatagoryRoutingModule } from './main-new-catagory-routing.module';
import { MainNewCatagoryComponent } from './main-new-catagory.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from 'src/app/shared';

@NgModule({
  declarations: [MainNewCatagoryComponent],
  imports: [
    CommonModule,MainNewCatagoryRoutingModule,PageHeaderModule , ReactiveFormsModule,FormModule
  ]
})
export class MainNewCatagoryModule { }
