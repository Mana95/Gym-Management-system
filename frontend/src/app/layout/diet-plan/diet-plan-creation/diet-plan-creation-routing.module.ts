
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DietPlanCreationComponent } from './diet-plan-creation.component';


const routes : Routes = [
  {
      path: '',
      component: DietPlanCreationComponent
  }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DietPlanCreationRoutingModule {
}

