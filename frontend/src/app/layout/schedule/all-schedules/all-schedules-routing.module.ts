import { AllSchedulesComponent } from './all-schedules.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', component: AllSchedulesComponent
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AllSchedulesModuleRoutingModule {
}
