import { FormRoutingModule } from './../form/form-routing.module';
import { ExerciseRoutingModule } from './exercise-routing.module';
import { ExerciseComponent } from './exercise.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from 'src/app/shared';
import { NewExerciseComponent } from './new-exercise/new-exercise.component';

@NgModule({
  declarations: [ExerciseComponent],
  imports: [
    CommonModule, PageHeaderModule , ExerciseRoutingModule
  ]
})
export class ExerciseModule { }
