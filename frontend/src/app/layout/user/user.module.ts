import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import { NewUserComponent } from './new-user/new-user.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
 
  imports: [
    CommonModule  , UserRoutingModule ,PageHeaderModule ,   FormsModule,
    ReactiveFormsModule
  ],
  declarations: [UserComponent]
})
export class UserModule { }
