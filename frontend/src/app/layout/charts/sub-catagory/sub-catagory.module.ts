import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubCatagoryRoutingModule } from './sub-catagory-routing.module';
import { FormModule } from './../../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SubCatagoryComponent } from './sub-catagory.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SubCatagoryComponent],
  imports: [
    CommonModule ,SubCatagoryRoutingModule, ReactiveFormsModule,FormModule , NgbModule
  ]
})
export class SubCatagoryModule { }
