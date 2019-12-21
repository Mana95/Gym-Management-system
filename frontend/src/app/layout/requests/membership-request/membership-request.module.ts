import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipRequestComponent } from './membership-request.component';
import { MembershipRequestRoutingModule } from './membership-request-routing.module';

@NgModule({
  declarations: [MembershipRequestComponent],
  imports: [
    CommonModule , ReactiveFormsModule , MembershipRequestRoutingModule
  ]
})
export class MembershipRequestModule { }
