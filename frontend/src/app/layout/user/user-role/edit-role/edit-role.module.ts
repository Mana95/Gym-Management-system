import { EditRoleComponent } from './edit-role.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditRoleRoutingModule } from './edit-role-routing.module';
import { PageHeaderModule } from 'src/app/shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [EditRoleComponent],
  imports: [
    CommonModule ,EditRoleRoutingModule ,PageHeaderModule, NgbModule
  ]
})
export class EditRoleModule { }
