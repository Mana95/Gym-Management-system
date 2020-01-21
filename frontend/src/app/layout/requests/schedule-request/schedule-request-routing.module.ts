import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleRequestComponent } from './schedule-request.component';



const routes: Routes = [
    {
        path: '', component: ScheduleRequestComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRequestRoutingModule { }
