import { ReactiveFormsModule } from '@angular/forms';
import { PoReportsComponent } from './po-reports.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoReportsRoutingModule } from './po-reports-routing.module';

@NgModule({
  declarations: [PoReportsComponent],
  imports: [
    CommonModule , PoReportsRoutingModule , ReactiveFormsModule
  ]
})
export class PoReportsModule { }
