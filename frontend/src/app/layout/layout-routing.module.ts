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
            { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
            { path: 'newUser', loadChildren: () => import('./user/new-user/new-user.module').then(m => m.NewUserModule) },
            { path: 'customers', loadChildren: () => import('./user/customers/customers.module').then(m => m.CustomersModule) },
            { path: 'suppliers', loadChildren: () => import('./user/suppliers/suppliers.module').then(m => m.SuppliersModule) },
            { path: 'userRole', loadChildren: () => import('./user/user-role/user-role.module').then(m => m.UserRoleModule) },
            { path: 'userNewRole', loadChildren: () => import('./user/user-role/user-new-role/user-new-role.module').then(m => m.UserNewRoleModule) },
            { path: 'editUser/:userid', loadChildren: () => import('./user/edit-user/edit-user.module').then(m => m.EditUserModule) },
            { path: 'changepw', loadChildren: () => import('./user/edit-user/change-pw/change-pw.module').then(m => m.ChangePwModule) },
            //  { path: 'editGroup/:groupId', loadChildren: () => import('./user/user-group/edit-group/edit-group.module').then(m => m.EditGroupModule) },
            { path: 'editRole/:roleId', loadChildren: () => import('./user/user-role/edit-role/edit-role.module').then(m => m.EditRoleModule) },
            { path: 'mainCat', loadChildren: () => import('./charts/main-catagory/main-catagory.module').then(m => m.MainCatagoryModule) },
            { path: 'newMainCat', loadChildren: () => import('./charts/main-catagory/main-new-catagory/main-new-catagory.module').then(m => m.MainNewCatagoryModule) },
            { path: 'newSubCat', loadChildren: () => import('./charts/sub-catagory/sub-catagory.module').then(m => m.SubCatagoryModule) },


            { path: 'new_cus', loadChildren: () => import('./user/customers/new-customer/new-customer.module').then(m => m.NewCustomerModule) },
            { path: 'edit_cus/:id', loadChildren: () => import('./user/customers/edit-customers/edit-customers.module').then(m => m.EditCustomersModule) },
            { path: 'new_sup', loadChildren: () => import('./user/suppliers/new-suppliers/new-suppliers.module').then(m => m.NewSuppliersModule) },


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
export class LayoutRoutingModule { }
