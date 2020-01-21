import { VeiwScheduleComponent } from './veiw-schedule.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { VeiwScheduleRoutingModule } from './veiw-schedule-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [VeiwScheduleComponent],
  imports: [
    CommonModule , ReactiveFormsModule , VeiwScheduleRoutingModule ,NgxPaginationModule
  ]
})
export class VeiwScheduleModule { }
