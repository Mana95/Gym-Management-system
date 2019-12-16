import { GetMembershipRoutingModule } from './getmembership-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { GetmembershipComponent } from './getmembership.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [GetmembershipComponent],
  imports: [
    CommonModule , ReactiveFormsModule , GetMembershipRoutingModule
  ]
})
export class GetmembershipModule { }
