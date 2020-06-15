import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InstructorsViewRoutingModule } from './instructors-view-routing.module';
import { InstructorsViewComponent } from './instructors-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [InstructorsViewComponent],
  imports: [
    CommonModule , InstructorsViewRoutingModule ,NgbModule
  ]
})
export class InstructorsViewModule { }
