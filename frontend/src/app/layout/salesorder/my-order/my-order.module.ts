import { MyOrderModuleRoutingModule } from './my-order-routing.module';
import { MyOrderComponent } from './my-order.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { PageHeaderModule } from 'src/app/shared';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [MyOrderComponent],
  imports: [
    CommonModule , MyOrderModuleRoutingModule ,PageHeaderModule , FormsModule,Ng2SearchPipeModule,NgxPaginationModule,
    ReactiveFormsModule,NgbModule,SharedModule
  ]
})
export class MyOrderModule { }
