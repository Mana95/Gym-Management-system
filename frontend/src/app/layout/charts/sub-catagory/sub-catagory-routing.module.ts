import { SubCatagoryComponent } from './sub-catagory.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



const routes: Routes = [{
    path: '' ,component: SubCatagoryComponent
}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SubCatagoryRoutingModule {}