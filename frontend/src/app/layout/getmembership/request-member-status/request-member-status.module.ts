import { RequestMemberStatusModuleRoutingModule } from './request-member-status-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestMemberStatusComponent } from './request-member-status.component';
import { PageHeaderModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [RequestMemberStatusComponent],
  imports: [
    CommonModule ,RequestMemberStatusModuleRoutingModule,PageHeaderModule ,   FormsModule,
    ReactiveFormsModule ,FileUploadModule ,  NgbModule, NgxPaginationModule ,Ng2SearchPipeModule ,SharedModule,
  ]
})
export class RequestMemberStatusModule { }
