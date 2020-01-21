import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { PageHeaderModule } from '../../shared';
import { MainCatagoryComponent } from './main-catagory/main-catagory.component';
import { SubCatagoryComponent } from './sub-catagory/sub-catagory.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule, ChartsRoutingModule, PageHeaderModule,NgbModule
    ],
    declarations: [ChartsComponent]
})
export class ChartsModule {}
