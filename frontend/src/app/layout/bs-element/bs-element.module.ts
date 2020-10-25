import { SharedModule } from 'src/app/shared/shared/shared.module';



import { FormModule } from './../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsElementRoutingModule } from './bs-element-routing.module';
import { BsElementComponent } from './bs-element.component';
import { PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, BsElementRoutingModule, PageHeaderModule, NgbModule , ReactiveFormsModule,SharedModule,FormModule],
    declarations: [BsElementComponent]
})
export class BsElementModule {}
