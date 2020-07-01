import { MemberViewExerciseComponent } from './member-view-exercise.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberViewExerciseRoutingModule } from './member-view-exercise-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MemberViewExerciseComponent],
  imports: [
    CommonModule ,MemberViewExerciseRoutingModule ,FormsModule
  ]
})
export class MemberViewExerciseModule { }
