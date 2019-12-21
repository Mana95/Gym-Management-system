import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembershiptypeComponent } from './membershiptype/membershiptype.component';
import { ScheduleTypeComponent } from './schedule-type/schedule-type.component';
import { InstructorsComponent } from './instructors/instructors.component';

@NgModule({
 
  imports: [
    CommonModule  , UserRoutingModule ,PageHeaderModule ,   FormsModule,
    ReactiveFormsModule
  ],
  declarations: [UserComponent, InstructorsComponent]
})
export class UserModule { }
