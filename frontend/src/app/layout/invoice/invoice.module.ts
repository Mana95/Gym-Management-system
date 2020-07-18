import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { InvoiceModuleRoutingModule } from './invoice-routing.module';
import { PageHeaderModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [InvoiceComponent],
  imports: [
    CommonModule ,InvoiceModuleRoutingModule ,PageHeaderModule ,   FormsModule,
    ReactiveFormsModule ,FileUploadModule ,  NgbModule, NgxPaginationModule ,Ng2SearchPipeModule ,SharedModule,
  ]
})
export class InvoiceModule { }
