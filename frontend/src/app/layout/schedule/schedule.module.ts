import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { NotifierModule, NotifierOptions } from "angular-notifier";
import { SchedulePlanComponent } from './schedule-plan/schedule-plan.component';


@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule ,ScheduleRoutingModule ,ReactiveFormsModule ,NgxPaginationModule 
  ]
})
export class ScheduleModule { }
