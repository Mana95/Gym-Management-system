import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewDietPlanComponent } from './view-diet-plan.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDietPlanRoutingModule } from './view-diet-plan-routing.module';
import { DietIntervalsComponent } from './diet-intervals/diet-intervals.component';

@NgModule({
  declarations: [ViewDietPlanComponent, DietIntervalsComponent],
  imports: [
    CommonModule ,ViewDietPlanRoutingModule,NgbModule 
  ],
  entryComponents: [DietIntervalsComponent]
})
export class ViewDietPlanModule { }
