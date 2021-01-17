import { MembershipTypeRoutingModule } from './membershiptype-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembershiptypeComponent } from './membershiptype.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [MembershiptypeComponent],
  imports: [
    CommonModule, ReactiveFormsModule  , NgbModule , 
    NgxPaginationModule ,Ng2SearchPipeModule ,FormsModule
 ,MembershipTypeRoutingModule
  ]
})
export class MembershiptypeModule { }
