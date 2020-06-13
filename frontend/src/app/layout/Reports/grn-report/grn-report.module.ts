import { GrnReportComponent } from './grn-report.component';
import { GRNReportsRoutingModule } from './grn-report-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [GrnReportComponent],
  imports: [
    CommonModule ,GRNReportsRoutingModule
  ]
})
export class GrnReportModule { }
