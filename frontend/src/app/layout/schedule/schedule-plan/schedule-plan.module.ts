import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SchedulePlanRoutingModule } from './schedule-plan-routing.module';
import { SchedulePlanComponent } from './schedule-plan.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SchedulePlanComponent],
  imports: [
    CommonModule , SchedulePlanRoutingModule ,NgbModule
  
  ]
})
export class SchedulePlanModule { }
