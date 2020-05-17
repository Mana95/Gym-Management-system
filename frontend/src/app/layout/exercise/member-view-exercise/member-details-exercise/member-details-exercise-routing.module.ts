import { MemberDetailsExerciseComponent } from './member-details-exercise.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '', component: MemberDetailsExerciseComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MemberDetailsExerciseRoutingModule {
}
