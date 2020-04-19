import { FullCalendarModule } from '@fullcalendar/angular';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { DietPlanRoutingModule } from './diet-plan-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietPlanComponent } from './diet-plan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DietPlanCreationComponent } from './diet-plan-creation/diet-plan-creation.component';

import {DayPilotModule} from "daypilot-pro-angular";
import { CalendarModule } from 'angular-calendar';

@NgModule({
  declarations: [DietPlanComponent],
  imports: [
    CommonModule ,DietPlanRoutingModule ,ReactiveFormsModule ,
     SharedModule , 
     NgbModule,
     DayPilotModule,
     
    
     FullCalendarModule // for FullCalendar!
  ]
})
export class DietPlanModule { }
