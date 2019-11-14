import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            {path: 'user' , loadChildren:() => import('./user/user.module').then(m => m.UserModule)},
            {path: 'newUser' , loadChildren:() => import('./user/new-user/new-user.module').then(m => m.NewUserModule)},
            {path: 'userGroup' , loadChildren:() => import('./user/user-group/user-group.module').then(m => m.UserGroupModule)},
            {path: 'newUserGroup' , loadChildren:() => import('./user/user-group/new-user-group/new-user-group.module').then(m=> m.NewUserGroupModule)},
            {path: 'userRole' , loadChildren:() => import('./user/user-role/user-role.module').then(m=> m.UserRoleModule)},
            {path: 'userNewRole' , loadChildren:() => import('./user/user-role/user-new-role/user-new-role.module').then(m=> m.UserNewRoleModule)},
            {path: 'editUser/:userid' , loadChildren:() => import('./user/edit-user/edit-user.module').then(m=> m.EditUserModule)},
            {path: 'changepw' , loadChildren:() => import('./user/edit-user/change-pw/change-pw.module').then(m=> m.ChangePwModule)},
           
            { path: 'brands', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
            { path: 'catagory', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
            { path: 'stores', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
            { path: 'bs-element', loadChildren: () => import('./bs-element/bs-element.module').then(m => m.BsElementModule) },
            { path: 'salesOrder', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) },
            { path: 'components', loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule) },
            { path: 'blank-page', loadChildren: () => import('./blank-page/blank-page.module').then(m => m.BlankPageModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
