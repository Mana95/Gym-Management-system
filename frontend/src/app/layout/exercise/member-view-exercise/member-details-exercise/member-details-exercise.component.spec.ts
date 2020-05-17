import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailsExerciseComponent } from './member-details-exercise.component';

describe('MemberDetailsExerciseComponent', () => {
  let component: MemberDetailsExerciseComponent;
  let fixture: ComponentFixture<MemberDetailsExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDetailsExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
