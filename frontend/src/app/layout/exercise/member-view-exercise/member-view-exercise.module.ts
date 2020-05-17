import { MemberViewExerciseComponent } from './member-view-exercise.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberViewExerciseRoutingModule } from './member-view-exercise-routing.module';

@NgModule({
  declarations: [MemberViewExerciseComponent],
  imports: [
    CommonModule ,MemberViewExerciseRoutingModule 
  ]
})
export class MemberViewExerciseModule { }
