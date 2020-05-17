import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberViewExerciseComponent } from './member-view-exercise.component';

describe('MemberViewExerciseComponent', () => {
  let component: MemberViewExerciseComponent;
  let fixture: ComponentFixture<MemberViewExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberViewExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberViewExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
