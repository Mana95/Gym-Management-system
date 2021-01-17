import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubCatagoryRoutingModule } from './sub-catagory-routing.module';
import { FormModule } from './../../form/form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubCatagoryComponent } from './sub-catagory.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [SubCatagoryComponent],
  imports: [
    CommonModule ,  FormsModule,NgxPaginationModule ,Ng2SearchPipeModule  ,SubCatagoryRoutingModule, ReactiveFormsModule,FormModule , NgbModule
  ]
})
export class SubCatagoryModule { }
