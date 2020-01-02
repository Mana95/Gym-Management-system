import { AcceptedScheduleRoutingModule } from './accepted-schedule-routing.module';
import { AcceptedScheduleComponent } from './accepted-schedule.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AcceptedScheduleComponent],
  imports: [
    CommonModule ,AcceptedScheduleRoutingModule, ReactiveFormsModule
  ]
})
export class AcceptedScheduleModule { 




  
}
