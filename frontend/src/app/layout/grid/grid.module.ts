import { SharedModule } from 'src/app/shared/shared/shared.module';

import { FormModule } from './../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridRoutingModule } from './grid-routing.module';
import { GridComponent } from './grid.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, GridRoutingModule, PageHeaderModule, ReactiveFormsModule,FormModule ,SharedModule],
    declarations: [GridComponent]
})
export class GridModule {}
