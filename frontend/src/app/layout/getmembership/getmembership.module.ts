import { TwoDigitDecimaNumberDirective } from './../../_directives/twodigitdecimalnumber.directive';
import { GetMembershipRoutingModule } from './getmembership-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { GetmembershipComponent } from './getmembership.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [GetmembershipComponent ,TwoDigitDecimaNumberDirective],
  imports: [
    CommonModule , ReactiveFormsModule , GetMembershipRoutingModule
  ]
})
export class GetmembershipModule { }
