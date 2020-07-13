
import 'flatpickr/dist/flatpickr.css'; // you may need to adjust the css import depending on your build tool

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { DietPlanRoutingModule } from './diet-plan-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietPlanComponent } from './diet-plan.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CalendarModule, DateAdapter } from 'angular-calendar';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [DietPlanComponent],
  imports: [
    CommonModule ,DietPlanRoutingModule ,ReactiveFormsModule ,NgxPaginationModule,Ng2SearchPipeModule,
     SharedModule , 
     NgbModule,
     FormsModule,
  
     
   
  ]
})
export class DietPlanModule { }
