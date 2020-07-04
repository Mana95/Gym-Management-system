import { CheckoutComponent } from './../checkout/checkout.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddToCartComponent } from './add-to-cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddToCartRoutingModule } from './add-to-cart-routing.module';

@NgModule({
  declarations: [AddToCartComponent , CheckoutComponent],
  imports: [
    CommonModule , ReactiveFormsModule ,AddToCartRoutingModule ,NgbModule ,SharedModule
  ], 
    entryComponents: [CheckoutComponent]

})
export class AddToCartModule { }
