import { FileUploadModule } from 'ng2-file-upload';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { EditCustomersComponent } from './edit-customers.component';
import { EditCustomersRoutingModule } from './edit-customers-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [EditCustomersComponent],
  imports: [
    CommonModule ,
    ReactiveFormsModule,SharedModule,
    NgbModule,EditCustomersRoutingModule,FileUploadModule,
  ]
})
export class EditCustomersModule { }
