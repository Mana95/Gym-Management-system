import { ReactiveFormsModule } from '@angular/forms';
import { InstructorsRoutingModule } from './instructors-routing.module';


import { InstructorsComponent } from './instructors.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { InstructorsEditComponent } from './instructors-edit/instructors-edit.component';


@NgModule({
  declarations: [InstructorsComponent],
  imports: [
    CommonModule ,ReactiveFormsModule ,InstructorsRoutingModule ,FileUploadModule,NgbModule ,SharedModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
})
export class InstructorsModule { }
