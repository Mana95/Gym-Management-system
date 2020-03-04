import { SharedModule } from 'src/app/shared/shared/shared.module';
import { SharedPipesModule } from './../../shared/pipes/shared-pipes.module';
import { FileUploadModule } from 'ng2-file-upload';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembershiptypeComponent } from './membershiptype/membershiptype.component';
import { ScheduleTypeComponent } from './schedule-type/schedule-type.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ModalModule } from 'ngx-bootstrap';

@NgModule({
 
  imports: [
    CommonModule  , UserRoutingModule ,PageHeaderModule ,   FormsModule,
    ReactiveFormsModule ,FileUploadModule ,
    NgbModule, NgxPaginationModule ,Ng2SearchPipeModule ,SharedModule,
    ModalModule.forRoot(),
  ],
  declarations: [UserComponent],
  
})
export class UserModule { }
