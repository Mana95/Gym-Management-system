import { SharedModule } from 'src/app/shared/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule ,CheckoutRoutingModule,ReactiveFormsModule ,NgbModule ,SharedModule
  ]
})
export class CheckoutModule { }
