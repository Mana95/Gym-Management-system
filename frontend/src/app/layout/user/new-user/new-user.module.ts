import { NewUserRoutingModule } from './new-user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../../shared';
import { NewUserComponent } from './new-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [NewUserComponent],
  imports: [
    CommonModule, NewUserRoutingModule  ,PageHeaderModule ,   FormsModule,
    ReactiveFormsModule,FileUploadModule
  ]
})
export class NewUserModule { }
