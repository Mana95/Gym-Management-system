import { ReactiveFormsModule } from '@angular/forms';
import { UserReportComponent } from './user-report.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserReportsRoutingModule } from './user-report-routing.module';

@NgModule({
  declarations: [UserReportComponent],
  imports: [
    CommonModule ,UserReportsRoutingModule ,ReactiveFormsModule
  ]
})
export class UserReportModule { }
