import { MembershipTypeRoutingModule } from './membershiptype-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';
import { MembershiptypeComponent } from './membershiptype.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MembershiptypeComponent],
  imports: [
    CommonModule, ReactiveFormsModule  , NgbModule , MembershipTypeRoutingModule
  ]
})
export class MembershiptypeModule { }
