import { AcceptedScheduleComponent } from './accepted-schedule.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', component: AcceptedScheduleComponent
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AcceptedScheduleRoutingModule {
}
