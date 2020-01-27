import { SharedModule } from 'src/app/shared/shared/shared.module';
import { TwoDigitDecimaNumberDirective } from './../../_directives/twodigitdecimalnumber.directive';
import { GetMembershipRoutingModule } from './getmembership-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { GetmembershipComponent } from './getmembership.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [GetmembershipComponent],
  imports: [
    CommonModule , ReactiveFormsModule , GetMembershipRoutingModule ,SharedModule
  ]
})
export class GetmembershipModule { }
