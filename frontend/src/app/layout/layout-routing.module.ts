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
            { path: 'userRole', loadChildren: () => import('./user/user-role/user-role.module').then(m => m.UserRoleModule) , canActivate: [AuthGuard] , data: { roles: [Role.Admin]  } },
            { path: 'suppliers', loadChildren: () => import('./user/suppliers/suppliers.module').then(m => m.SuppliersModule) , canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            { path: 'Membership', loadChildren: () => import('./user/customers/customers.module').then(m => m.CustomersModule) , canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.Membership] } },
            { path: 'instructor', loadChildren: () => import('./user/instructors/instructors.module').then(m => m.InstructorsModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            { path: 'schedultType', loadChildren: () => import('./user/schedule-type/schedule-type.module').then(m => m.ScheduleTypeModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            { path: 'membershiptype', loadChildren: () => import('./user/membershiptype/membershiptype.module').then(m => m.MembershiptypeModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            { path: 'new_cus', loadChildren: () => import('./user/customers/new-customer/new-customer.module').then(m => m.NewCustomerModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            { path: 'new_sup', loadChildren: () => import('./user/suppliers/new-suppliers/new-suppliers.module').then(m => m.NewSuppliersModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            { path: 'allSchedule', loadChildren: () => import('./schedule/all-schedules/all-schedules.module').then(m => m.AllSchedulesModule), canActivate: [AuthGuard] , data: { roles: [Role.Instructor , Role.Admin] } },

            { path: 'mainCat', loadChildren: () => import('./charts/main-catagory/main-catagory.module').then(m => m.MainCatagoryModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User] } },
            { path: 'newSubCat', loadChildren: () => import('./charts/sub-catagory/sub-catagory.module').then(m => m.SubCatagoryModule) , canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User] } },
            { path: 'catagory', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) , canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User] }},
          
            { path: 'reqSalesOrder', loadChildren: () => import('./requests/sales-order-request/sales-order-request.module').then(m => m.SalesOrderRequestModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User] } },
            { path: 'reqPurchaseOrder', loadChildren: () => import('./requests/purchase-order-request/purchase-order-request.module').then(m => m.PurchaseOrderRequestModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User] } },
            { path: 'requestSchedule', loadChildren: () => import('./requests/schedule-request/schedule-request.module').then(m => m.ScheduleRequestModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User , Role.Instructor] } },
            { path: 'requestMemberShipType', loadChildren: () => import('./requests/membership-request/membership-request.module').then(m => m.MembershipRequestModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User ] } },
           
            { path: 'instructor-view', loadChildren: () => import('./user/instructors/instructors-view/instructors-view.module').then(m => m.InstructorsViewModule), canActivate: [AuthGuard]},
        
                  
            { path: 'sales_order_cart', loadChildren: () => import('./salesorder/sales-order-cart/sales-order-cart.module').then(m => m.SalesOrderCartModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User , Role.Instructor,Role.Membership] } },        
            { path: 'ItemCartView/:id', loadChildren: () => import('./salesorder/sale-order-item-view/sale-order-item-view.module').then(m => m.SaleOrderItemViewModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User , Role.Membership , Role.Instructor] } },        
            { path: 'addToCart', loadChildren: () => import('./salesorder/add-to-cart/add-to-cart.module').then(m => m.AddToCartModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User , Role.Membership ,Role.Instructor] } },        
            { path: 'checkout', loadChildren: () => import('./salesorder/checkout/checkout.module').then(m => m.CheckoutModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.Membership , Role.Instructor] } },        
        
            
            { path: 'pending', loadChildren: () => import('./salesorder/salesorder.module').then(m => m.SalesorderModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User , Role.Customer] } },        
            { path: 'bs-element', loadChildren: () => import('./bs-element/bs-element.module').then(m => m.BsElementModule) , canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User , Role.Supplier] } },
            { path: 'newUser', loadChildren: () => import('./user/new-user/new-user.module').then(m => m.NewUserModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin] }  },
             { path: 'userNewRole', loadChildren: () => import('./user/user-role/user-new-role/user-new-role.module').then(m => m.UserNewRoleModule) , canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            { path: 'editUser/:userid', loadChildren: () => import('./user/edit-user/edit-user.module').then(m => m.EditUserModule) , canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
           // { path: 'changepw', loadChildren: () => import('./user/edit-user/change-pw/change-pw.module').then(m => m.ChangePwModule) },
            //  { path: 'editGroup/:groupId', loadChildren: () => import('./user/user-group/edit-group/edit-group.module').then(m => m.EditGroupModule) },
            { path: 'editRole/:roleId', loadChildren: () => import('./user/user-role/edit-role/edit-role.module').then(m => m.EditRoleModule) , canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            { path: 'newMainCat', loadChildren: () => import('./charts/main-catagory/main-new-catagory/main-new-catagory.module').then(m => m.MainNewCatagoryModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User] } },
            { path: 'schedule', loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User , Role.Membership] } },
            
            
            { path: 'newschedule', loadChildren: () => import('./schedule/newschedule/newschedule.module').then(m => m.NewscheduleModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin  , Role.Membership] } },
            { path: 'viewSchedule', loadChildren: () => import('./schedule/veiw-schedule/veiw-schedule.module').then(m => m.VeiwScheduleModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin, Role.Instructor] } },
            { path: 'acceptedSchedule/:id', loadChildren: () => import('./schedule/accepted-schedule/accepted-schedule.module').then(m => m.AcceptedScheduleModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.Instructor] } },
            { path: 'schedule_plan/:id', loadChildren: () => import('./schedule/schedule-plan/schedule-plan.module').then(m => m.SchedulePlanModule) },
          
            { path: 'diet_plan', loadChildren: () => import('./diet-plan/diet-plan.module').then(m => m.DietPlanModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User , Role.Membership] } },
           { path: 'diet_creation' , loadChildren: ()=> import('./diet-plan/diet-plan-creation/diet-plan-creation.module').then(m=> m.DietPlanCreationModule),canActivate: [AuthGuard] , data: { roles: [Role.Admin , Role.User , Role.Membership] } },
           { path: 'view-diet-plan/:id', loadChildren: () => import('./diet-plan/view-diet-plan/view-diet-plan.module').then(m => m.ViewDietPlanModule), canActivate: [AuthGuard] , data: { roles: [Role.Membership ,Role.Instructor , Role.Admin] } },
         


           { path: 'exercise', loadChildren: () => import('./exercise/exercise.module').then(m => m.ExerciseModule), canActivate: [AuthGuard] , data: { roles: [Role.Membership ,Role.Instructor , Role.Admin] } },
           { path: 'new-excercise', loadChildren: () => import('./exercise/new-exercise/new-exercise.module').then(m => m.NewExerciseModule), canActivate: [AuthGuard] , data: { roles: [Role.Membership ,Role.Instructor , Role.Admin] } },
           
           
           { path: 'memberexercise/:name', loadChildren: () => import('./exercise/member-view-exercise/member-view-exercise.module').then(m => m.MemberViewExerciseModule), canActivate: [AuthGuard] },
           { path: 'memberdetailsexercise', loadChildren: () => import('./exercise/member-view-exercise/member-details-exercise/member-details-exercise.module').then(m => m.MemberDetailsExerciseModule), canActivate: [AuthGuard] , data: { roles: [Role.Membership , Role.Admin]} },
           

           
           { path: 'newmembership', loadChildren: () => import('./getmembership/getmembership.module').then(m => m.GetmembershipModule), canActivate: [AuthGuard] , data: { roles: [Role.Member] } },
         
            { path: 'viewMembership/:id', loadChildren: () => import('./user/customers/edit-customers/edit-customers.module').then(m => m.EditCustomersModule), canActivate: [AuthGuard] , data: { roles: [Role.Admin] } },
            

            { path: 'profile/:id', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard]},
          


            { path: 'brands', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
              { path: 'stores', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
              { path: 'GRN', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) },
            { path: 'components', loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule) },

            //payment
            { path: 'payment', loadChildren: () => import('./blank-page/blank-page.module').then(m => m.BlankPageModule) },
         //   new-diet-plan


            //Reports
            { path: 'poReport', loadChildren: () => import('./Reports/po-reports/po-reports.module').then(m => m.PoReportsModule), canActivate: [AuthGuard]},
            { path: 'user_report', loadChildren: () => import('./Reports/user-report/user-report.module').then(m => m.UserReportModule), canActivate: [AuthGuard]},
            { path: 'grn_report', loadChildren: () => import('./Reports/grn-report/grn-report.module').then(m => m.GrnReportModule), canActivate: [AuthGuard]},
            { path: 'item_report', loadChildren: () => import('./Reports/item-report/item-report.module').then(m => m.ItemReportModule), canActivate: [AuthGuard]},
        



            {path:'edit-instructor-page/:id' , loadChildren: ()=> import('./user/instructors/instructors-edit/instructors-edit.module').then(m=>m.InstructorsEditModule), canActivate: [AuthGuard]},
            {path:'edit-supplier-page/:id' , loadChildren: ()=> import('./user/suppliers/edit-suplliers/edit-suplliers.module').then(m=>m.EditSuplliersModule), canActivate: [AuthGuard]},




            {path:'invoice' , loadChildren: ()=> import('./invoice/invoice.module').then(m=>m.InvoiceModule), canActivate: [AuthGuard]},
            { path: 'membsehipStatus', loadChildren: () => import('./getmembership/request-member-status/request-member-status.module').then(m => m.RequestMemberStatusModule), canActivate: [AuthGuard]},
          
            { path: 'myOrder', loadChildren: () => import('./salesorder/my-order/my-order.module').then(m => m.MyOrderModule), canActivate: [AuthGuard]},
         
            { path: 'renew-membership', loadChildren: () => import('./salesorder/my-order/my-order.module').then(m => m.MyOrderModule), canActivate: [AuthGuard]},
         


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
