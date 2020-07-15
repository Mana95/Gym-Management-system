import { AllSchedulesComponent } from './all-schedules.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllSchedulesModuleRoutingModule } from './all-schedules-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [AllSchedulesComponent],
  imports: [
    CommonModule ,AllSchedulesModuleRoutingModule ,FormsModule ,Ng2SearchPipeModule,NgxPaginationModule ,SharedModule ,NgbModule
  ]
})
export class AllSchedulesModule { }
