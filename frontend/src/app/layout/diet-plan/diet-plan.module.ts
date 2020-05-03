


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { DietPlanRoutingModule } from './diet-plan-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietPlanComponent } from './diet-plan.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DietPlanCreationComponent } from './diet-plan-creation/diet-plan-creation.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { SchedulerModule } from 'angular-calendar-scheduler';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';

@NgModule({
  declarations: [DietPlanComponent],
  imports: [
    CommonModule ,DietPlanRoutingModule ,ReactiveFormsModule ,
     SharedModule , 
     NgbModule,
     FormsModule,
     CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlatpickrModule.forRoot()
    
     
   
  ]
})
export class DietPlanModule { }
