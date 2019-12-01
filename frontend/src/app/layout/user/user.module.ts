import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
 
  imports: [
    CommonModule  , UserRoutingModule ,PageHeaderModule ,   FormsModule,
    ReactiveFormsModule
  ],
  declarations: [UserComponent]
})
export class UserModule { }
