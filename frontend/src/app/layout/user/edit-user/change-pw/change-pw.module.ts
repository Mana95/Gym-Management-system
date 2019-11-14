import { ChangePwRoutingModule } from './change-pw-routing.module';
import { PageHeaderModule } from './../../../../shared/modules/page-header/page-header.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChangePwComponent } from './change-pw.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ChangePwComponent],
  imports: [
    CommonModule ,ReactiveFormsModule ,FormsModule ,PageHeaderModule ,ChangePwRoutingModule
  ]
})
export class ChangePwModule { }
