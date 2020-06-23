
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipRequestComponent } from './membership-request.component';
import { MembershipRequestRoutingModule } from './membership-request-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [MembershipRequestComponent],
  imports: [
    CommonModule , MembershipRequestRoutingModule ,NgbModule ,FormsModule,Ng2SearchPipeModule 
    ,NgxPaginationModule ,SharedModule 
  ]
})
export class MembershipRequestModule { }
