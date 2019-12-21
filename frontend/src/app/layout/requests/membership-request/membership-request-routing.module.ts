

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MembershipRequestComponent } from './membership-request.component';


const routes: Routes = [
    {
        path: '', component: MembershipRequestComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MembershipRequestRoutingModule { }
