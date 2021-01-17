import { SharedModule } from './../../../shared/shared/shared.module';
import { ScheduleTypeRoutingModule } from './schedule-type-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleTypeComponent } from './schedule-type.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [ScheduleTypeComponent
  ],
  imports: [
    CommonModule , ReactiveFormsModule,
    FormsModule,NgxPaginationModule ,Ng2SearchPipeModule ,
    ScheduleTypeRoutingModule , SharedModule , NgbModule
  ]
})
export class ScheduleTypeModule { }
