import { FormModule } from './../../form/form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditModalComponent } from './../../user/edit-user/edit-modal/edit-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainCatagoryRoutingModule } from './main-catagory-routing.module';
import { MainCatagoryComponent } from './main-catagory.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from 'src/app/shared';
import { MainNewCatagoryComponent } from './main-new-catagory/main-new-catagory.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [MainCatagoryComponent,MainNewCatagoryComponent],
  imports: [
    CommonModule, MainCatagoryRoutingModule ,
    FormsModule,NgxPaginationModule ,Ng2SearchPipeModule ,PageHeaderModule ,NgbModule , ReactiveFormsModule , FormModule
  ],
  entryComponents: [MainNewCatagoryComponent]
})
export class MainCatagoryModule { }
