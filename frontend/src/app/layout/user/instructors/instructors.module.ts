import { ReactiveFormsModule } from '@angular/forms';
import { InstructorsRoutingModule } from './instructors-routing.module';


import { InstructorsComponent } from './instructors.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [InstructorsComponent],
  imports: [
    CommonModule ,ReactiveFormsModule ,InstructorsRoutingModule ,FileUploadModule,
  ]
})
export class InstructorsModule { }
