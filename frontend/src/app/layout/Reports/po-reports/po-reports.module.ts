import { ReactiveFormsModule } from '@angular/forms';
import { PoReportsComponent } from './po-reports.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoReportsRoutingModule } from './po-reports-routing.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [PoReportsComponent],
  imports: [
    CommonModule , PoReportsRoutingModule , ReactiveFormsModule ,ChartsModule
  ]
})
export class PoReportsModule { }
