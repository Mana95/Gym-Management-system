import { SharedModule } from './../../../shared/shared/shared.module';
import { DietPlanCreationRoutingModule } from './diet-plan-creation-routing.module';
import { DietPlanCreationComponent } from './diet-plan-creation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [DietPlanCreationComponent],
  imports: [
    CommonModule ,DietPlanCreationRoutingModule ,
    ReactiveFormsModule ,FormsModule, SharedModule , NgbModule,
    FullCalendarModule, // for FullCalendar!
    
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ]
})
export class DietPlanCreationModule { }
