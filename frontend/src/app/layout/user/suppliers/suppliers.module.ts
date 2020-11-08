import { ModalModule } from 'ngx-bootstrap';
import { SuppliersComponent } from './suppliers.component';
import { FormModule } from './../../form/form.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { PageHeaderModule } from 'src/app/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { EditSuplliersComponent } from './edit-suplliers/edit-suplliers.component';
import { NewSuppliersComponent } from './new-suppliers/new-suppliers.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [SuppliersComponent],
  imports: [
    CommonModule, SuppliersRoutingModule ,PageHeaderModule ,  NgxPaginationModule ,Ng2SearchPipeModule ,
    ReactiveFormsModule,FormModule, FormsModule,  ModalModule.forRoot(),SharedModule
  ]
})
export class SuppliersModule { }
