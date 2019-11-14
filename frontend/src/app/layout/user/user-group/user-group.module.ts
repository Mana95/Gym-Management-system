import { UserGroupComponent } from './user-group.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../../shared';
import { UserGroupRoutingModule } from './user-group-routing.module';
import { NewUserGroupComponent } from './new-user-group/new-user-group.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserGroupComponent],
  imports: [
    CommonModule , UserGroupRoutingModule ,PageHeaderModule,ReactiveFormsModule,
    FormsModule
  ]
})
export class UserGroupModule { }
