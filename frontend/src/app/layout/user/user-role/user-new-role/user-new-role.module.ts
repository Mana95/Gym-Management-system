import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserNewRoleRoutingModule } from './user-new-role-routing.module';
import { UserNewRoleComponent } from './user-new-role.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../../../shared';

@NgModule({
  declarations: [UserNewRoleComponent],
  imports: [
    CommonModule,UserNewRoleRoutingModule ,PageHeaderModule, ReactiveFormsModule,
    FormsModule
  ]
})
export class UserNewRoleModule { }
