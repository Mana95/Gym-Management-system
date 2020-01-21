import { SalesOrderCartComponent } from './sales-order-cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
    {
        path: '', component: SalesOrderCartComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesOrderCartRoutingModule { }
