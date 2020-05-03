// import '../../../../flatpickr/dist/flatpickr.css';


import { FlatpickrModule } from 'angularx-flatpickr';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SalesorderComponent } from './salesorder/salesorder.component';
import { GetmembershipComponent } from './getmembership/getmembership.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DietPlanComponent } from './diet-plan/diet-plan.component';
import { ProfileComponent } from './profile/profile.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        ReactiveFormsModule,
        FormsModule,
      
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
          }),
          FlatpickrModule.forRoot()
       
    ],
    
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent]
})
export class LayoutModule {}
