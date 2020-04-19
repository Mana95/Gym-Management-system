import { FormModule } from './../../form/form.module';
import { NewscheduleComponent } from './newschedule.component';
import { NewScheduleRoutingModule } from './newschedule-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


/**
 * Custom angular notifier options
 */
@NgModule({
  declarations: [NewscheduleComponent],
  imports: [
    CommonModule , NewScheduleRoutingModule , ReactiveFormsModule,FormModule,
  ]
})
export class NewscheduleModule { }
