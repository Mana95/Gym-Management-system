import { AddToCartComponent } from './add-to-cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
    {
        path: '', component: AddToCartComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  AddToCartRoutingModule { }
