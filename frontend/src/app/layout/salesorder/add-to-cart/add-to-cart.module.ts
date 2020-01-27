import { SharedModule } from 'src/app/shared/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddToCartComponent } from './add-to-cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddToCartRoutingModule } from './add-to-cart-routing.module';

@NgModule({
  declarations: [AddToCartComponent],
  imports: [
    CommonModule , ReactiveFormsModule ,AddToCartRoutingModule ,NgbModule ,SharedModule
  ]
})
export class AddToCartModule { }
