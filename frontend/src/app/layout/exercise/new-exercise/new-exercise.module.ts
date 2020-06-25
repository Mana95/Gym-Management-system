import { ReactiveFormsModule } from '@angular/forms';
import { NewExerciseComponent } from './new-exercise.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewExerciseRoutingModule } from './new-exercise-routing.module';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [NewExerciseComponent],
  imports: [
    CommonModule ,NewExerciseRoutingModule,ReactiveFormsModule ,FileUploadModule
  ]
})
export class NewExerciseModule { }
