import { MemberDetailsExerciseRoutingModule } from './member-details-exercise-routing.module';
import { MemberDetailsExerciseComponent } from './member-details-exercise.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MemberDetailsExerciseComponent],
  imports: [
    CommonModule , MemberDetailsExerciseRoutingModule
  ]
})
export class MemberDetailsExerciseModule { }
