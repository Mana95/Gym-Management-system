import { PageHeaderModule } from 'src/app/shared';
import { FormModule } from './../../form/form.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomersComponent } from './customers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule, CustomersRoutingModule ,PageHeaderModule , FormsModule,Ng2SearchPipeModule,NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class CustomersModule { }
