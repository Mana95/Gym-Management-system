import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


import { SchedulePlanComponent } from './schedule-plan/schedule-plan.component';


@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule ,ScheduleRoutingModule ,ReactiveFormsModule ,NgxPaginationModule ,SharedModule ,NgbModule
  ]
})
export class ScheduleModule { }
