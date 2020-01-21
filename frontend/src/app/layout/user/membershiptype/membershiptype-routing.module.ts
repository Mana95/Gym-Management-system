
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembershiptypeComponent } from './membershiptype.component';

const routes: Routes = [
    {
        path: '', component: MembershiptypeComponent
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MembershipTypeRoutingModule {
}
