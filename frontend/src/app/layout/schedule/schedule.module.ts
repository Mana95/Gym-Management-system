
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';


import { SchedulePlanComponent } from './schedule-plan/schedule-plan.component';
import { AllSchedulesComponent } from './all-schedules/all-schedules.component';


@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule ,ScheduleRoutingModule ,FormsModule ,Ng2SearchPipeModule,NgxPaginationModule ,SharedModule ,NgbModule
  ],
})
export class ScheduleModule { }
