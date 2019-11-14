import { UserRoleComponent } from './user-role.component';


import { NgModule } from '@angular/core';
import { UserRoleRoutingModule } from './user-role-routing.module';
import { PageHeaderModule } from '../../../shared';
import { UserComponent } from '../user.component';
import { CommonModule } from '@angular/common';
import { UserNewRoleComponent } from './user-new-role/user-new-role.component';

@NgModule({
 
    imports: [
      CommonModule  , UserRoleRoutingModule ,PageHeaderModule
    ],
    declarations: [UserRoleComponent]
  })
  export class UserRoleModule { }