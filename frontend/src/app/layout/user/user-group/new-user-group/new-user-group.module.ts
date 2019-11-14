import { PageHeaderModule } from './../../../../shared/modules/page-header/page-header.module';
import { NewUserGroupRoutingModule } from './new-user-group-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewUserGroupComponent } from './new-user-group.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewUserGroupComponent],
  imports: [
    CommonModule , NewUserGroupRoutingModule ,PageHeaderModule,ReactiveFormsModule,
    FormsModule
  ]
})
export class NewUserGroupModule { }
