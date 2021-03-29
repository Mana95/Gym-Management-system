import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileRoutingModule } from './profile-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule ,
     ProfileRoutingModule ,ReactiveFormsModule,NgbModule ,
     SharedModule , FileUploadModule
  ]
})
export class ProfileModule { }
