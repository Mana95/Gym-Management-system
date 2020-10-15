import { SharedModule } from './../../../shared/shared/shared.module';
import { ScheduleTypeRoutingModule } from './schedule-type-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleTypeComponent } from './schedule-type.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ScheduleTypeComponent
  ],
  imports: [
    CommonModule , ReactiveFormsModule ,ScheduleTypeRoutingModule , SharedModule , NgbModule
  ]
})
export class ScheduleTypeModule { }
