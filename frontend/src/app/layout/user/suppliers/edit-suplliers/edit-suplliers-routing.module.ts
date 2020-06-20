import { EditSuplliersComponent } from './edit-suplliers.component';



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', component:EditSuplliersComponent
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditSuppliersRoutingModule {
}
