import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemReportsRoutingModule } from './item-report-routing.module';
import { ItemReportComponent } from './item-report.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ItemReportComponent],
  imports: [
    CommonModule , ItemReportsRoutingModule , FormsModule ,NgbModule
  ]
})
export class ItemReportModule { }
