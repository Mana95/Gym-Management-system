import { SharedModule } from './../../shared/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { FormModule } from './../form/form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { PageHeaderModule } from './../../shared';
import { NgxPopoverImageModule } from 'ngx-popover-image';
import { EditItemComponent } from './edit-item/edit-item.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [CommonModule, TablesRoutingModule, PageHeaderModule,
              ReactiveFormsModule , SharedModule, FormModule , NgbModule ,FormsModule,NgxPaginationModule ,Ng2SearchPipeModule ,
               NgxPopoverImageModule
    ],
    declarations: [TablesComponent ,EditItemComponent],
    entryComponents: [EditItemComponent]
}) 
export class TablesModule {}
 