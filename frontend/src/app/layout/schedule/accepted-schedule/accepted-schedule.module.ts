import { FormModule } from './../../form/form.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { NumberDirective } from './../../../_directives/numbers-only.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AcceptedScheduleRoutingModule } from './accepted-schedule-routing.module';
import { AcceptedScheduleComponent } from './accepted-schedule.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



/**
 * Custom angular notifier options
 */


@NgModule({
  declarations: [AcceptedScheduleComponent],
  imports: [
    CommonModule ,AcceptedScheduleRoutingModule, ReactiveFormsModule,SharedModule ,NgbModule ,FormModule
  ]
})
export class AcceptedScheduleModule { 




  
}
