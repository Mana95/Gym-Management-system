import { ScheduleTypeRoutingModule } from './schedule-type-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleTypeComponent } from './schedule-type.component';

@NgModule({
  declarations: [ScheduleTypeComponent
  ],
  imports: [
    CommonModule , ReactiveFormsModule ,ScheduleTypeRoutingModule
  ]
})
export class ScheduleTypeModule { }
