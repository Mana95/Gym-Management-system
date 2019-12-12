import { TwoDigitDecimaNumberDirective } from './twodigitdecimalnumber.directive';
import { NumberDirective } from './numbers-only.directive';

import { FormModule } from './../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { PageHeaderModule } from './../../shared';


@NgModule({
    imports: [CommonModule, TablesRoutingModule, PageHeaderModule ,ReactiveFormsModule , FormModule],
    declarations: [TablesComponent ,NumberDirective , TwoDigitDecimaNumberDirective]
})
export class TablesModule {}
