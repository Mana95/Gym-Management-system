import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditGroupComponent } from './edit-group.component';
import { EditGroupRoutingModule } from './edit-group-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditModalComponent } from '../../edit-user/edit-modal/edit-modal.component';

@NgModule({
  declarations: [EditGroupComponent ,EditModalComponent],
  imports: [
    CommonModule , EditGroupRoutingModule ,PageHeaderModule,ReactiveFormsModule, NgbModule,
    FormsModule
  ]
})
export class EditGroupModule { }
