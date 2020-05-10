import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewDietPlanComponent } from './view-diet-plan.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDietPlanRoutingModule } from './view-diet-plan-routing.module';

@NgModule({
  declarations: [ViewDietPlanComponent],
  imports: [
    CommonModule ,ViewDietPlanRoutingModule,NgbModule 
  ]
})
export class ViewDietPlanModule { }
