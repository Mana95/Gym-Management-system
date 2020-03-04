import { ReactiveFormsModule } from '@angular/forms';
import { MemberLoginComponent } from './member-login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberLoginRoutingModule } from './member-login-routing.module';

@NgModule({
  declarations: [MemberLoginComponent],
  imports: [
    CommonModule,
    MemberLoginRoutingModule,
    ReactiveFormsModule,
    
  ]
})
export class MemberLoginModule { }
