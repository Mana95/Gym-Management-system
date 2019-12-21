import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { Role } from '../_models/role';
import { AuthGuard } from '../shared';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            { path: 'newUser', loadChildren: () => import('./user/new-user/new-user.module').then(m => m.NewUserModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin] }  },
            { path: 'customers', loadChildren: () => import('./user/customers/customers.module').then(m => m.CustomersModule) , canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            { path: 'suppliers', loadChildren: () => import('./user/suppliers/suppliers.module').then(m => m.SuppliersModule) , canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            { path: 'userRole', loadChildren: () => import('./user/user-role/user-role.module').then(m => m.UserRoleModule) , canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            { path: 'userNewRole', loadChildren: () => import('./user/user-role/user-new-role/user-new-role.module').then(m => m.UserNewRoleModule) , canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            { path: 'editUser/:userid', loadChildren: () => import('./user/edit-user/edit-user.module').then(m => m.EditUserModule) , canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
           // { path: 'changepw', loadChildren: () => import('./user/edit-user/change-pw/change-pw.module').then(m => m.ChangePwModule) },
            //  { path: 'editGroup/:groupId', loadChildren: () => import('./user/user-group/edit-group/edit-group.module').then(m => m.EditGroupModule) },
            { path: 'editRole/:roleId', loadChildren: () => import('./user/user-role/edit-role/edit-role.module').then(m => m.EditRoleModule) , canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            { path: 'mainCat', loadChildren: () => import('./charts/main-catagory/main-catagory.module').then(m => m.MainCatagoryModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User] } },
            { path: 'newMainCat', loadChildren: () => import('./charts/main-catagory/main-new-catagory/main-new-catagory.module').then(m => m.MainNewCatagoryModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User] } },
            { path: 'newSubCat', loadChildren: () => import('./charts/sub-catagory/sub-catagory.module').then(m => m.SubCatagoryModule) , canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User] } },
            { path: 'reqSalesOrder', loadChildren: () => import('./requests/sales-order-request/sales-order-request.module').then(m => m.SalesOrderRequestModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User] } },
            { path: 'reqPurchaseOrder', loadChildren: () => import('./requests/purchase-order-request/purchase-order-request.module').then(m => m.PurchaseOrderRequestModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User] } },
            { path: 'salesorder', loadChildren: () => import('./salesorder/salesorder.module').then(m => m.SalesorderModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User] } },
            { path: 'membershiptype', loadChildren: () => import('./user/membershiptype/membershiptype.module').then(m => m.MembershiptypeModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            { path: 'requestMemberShipType', loadChildren: () => import('./requests/membership-request/membership-request.module').then(m => m.MembershipRequestModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User ,Role.Customer] } },
            { path: 'schedultType', loadChildren: () => import('./user/schedule-type/schedule-type.module').then(m => m.ScheduleTypeModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            { path: 'instructor', loadChildren: () => import('./user/instructors/instructors.module').then(m => m.InstructorsModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
         
            { path: 'newmembership', loadChildren: () => import('./getmembership/getmembership.module').then(m => m.GetmembershipModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User] } },
         
            { path: 'new_cus', loadChildren: () => import('./user/customers/new-customer/new-customer.module').then(m => m.NewCustomerModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            { path: 'edit_cus/:id', loadChildren: () => import('./user/customers/edit-customers/edit-customers.module').then(m => m.EditCustomersModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            { path: 'new_sup', loadChildren: () => import('./user/suppliers/new-suppliers/new-suppliers.module').then(m => m.NewSuppliersModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },


            { path: 'brands', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
            { path: 'catagory', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) , canActivate: [AuthGuard] , data: { roles: [Role.Admin] }},
            { path: 'stores', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
            { path: 'bs-element', loadChildren: () => import('./bs-element/bs-element.module').then(m => m.BsElementModule) },
            { path: 'GRN', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) },
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
