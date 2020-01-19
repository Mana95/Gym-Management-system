import { SaleOrderItemViewComponent } from './sale-order-item-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
    {
        path: '', component: SaleOrderItemViewComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleOrderItemViewRoutingModule { }
