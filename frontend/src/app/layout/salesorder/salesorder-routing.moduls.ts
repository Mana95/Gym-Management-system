import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesorderComponent } from './salesorder.component';


const routes: Routes = [
    {
        path: '', component: SalesorderComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesOrderRoutingModule { }
