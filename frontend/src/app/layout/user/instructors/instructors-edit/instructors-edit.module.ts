import { FormModule } from './../../../form/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InstructorsEditComponent } from './instructors-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorsEditRoutingModule } from './instructors-edit-routing.module';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [InstructorsEditComponent],
  imports: [
    CommonModule ,InstructorsEditRoutingModule ,ReactiveFormsModule ,FileUploadModule ,FormModule
  ]
})
export class InstructorsEditModule { }
