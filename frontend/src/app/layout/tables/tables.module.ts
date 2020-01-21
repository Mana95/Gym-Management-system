import { TwoDigitDecimaNumberDirective } from './twodigitdecimalnumber.directive';
import { NumberDirective } from './numbers-only.directive';

import { FormModule } from './../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { PageHeaderModule } from './../../shared';
import { NgxPopoverImageModule } from 'ngx-popover-image';


@NgModule({
    imports: [CommonModule, TablesRoutingModule, PageHeaderModule ,ReactiveFormsModule , FormModule ,NgxPopoverImageModule],
    declarations: [TablesComponent ,NumberDirective , TwoDigitDecimaNumberDirective]
})
export class TablesModule {}
