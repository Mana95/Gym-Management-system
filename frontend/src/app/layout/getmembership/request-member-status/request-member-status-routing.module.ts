import { RequestMemberStatusComponent } from './request-member-status.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '', component: RequestMemberStatusComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
 export class RequestMemberStatusModuleRoutingModule {
}
