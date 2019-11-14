import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserRoleComponent } from './user-role.component';

const routes: Routes = [
    {
        path: '', component: UserRoleComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoleRoutingModule { }
