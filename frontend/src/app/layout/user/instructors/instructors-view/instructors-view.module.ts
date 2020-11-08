import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InstructorsViewRoutingModule } from './instructors-view-routing.module';
import { InstructorsViewComponent } from './instructors-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [InstructorsViewComponent],
  imports: [
    CommonModule , InstructorsViewRoutingModule ,NgbModule, NgxPaginationModule ,Ng2SearchPipeModule ,FormsModule
  ]
})
export class InstructorsViewModule { }
