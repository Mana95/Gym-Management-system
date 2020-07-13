import { NumberDirective } from './../../_directives/numbers-only.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormModule } from './../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SalesOrderRoutingModule } from './salesorder-routing.moduls';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesorderComponent } from './salesorder.component';
import { SaleOrderItemViewComponent } from './sale-order-item-view/sale-order-item-view.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CommentComponent } from './Comment_templates/comment/comment.component';
import { ReplyCommentComponent } from './Comment_templates/reply-comment/reply-comment.component';
import { ChildboxComponent } from './Comment_templates/childbox/childbox.component';



@NgModule({
  declarations: [SalesorderComponent, CommentComponent, ReplyCommentComponent, ChildboxComponent],
 
  imports: [
    CommonModule , SalesOrderRoutingModule,ReactiveFormsModule,FormModule ,NgbModule
  ]
})
export class SalesorderModule { }
