import { TwoDigitDecimaNumberDirective } from './../../_directives/twodigitdecimalnumber.directive';
import { NumberDirective } from './../../_directives/numbers-only.directive';
import { FormModule } from './../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridRoutingModule } from './grid-routing.module';
import { GridComponent } from './grid.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, GridRoutingModule, PageHeaderModule, ReactiveFormsModule,FormModule],
    declarations: [GridComponent,TwoDigitDecimaNumberDirective]
})
export class GridModule {}
