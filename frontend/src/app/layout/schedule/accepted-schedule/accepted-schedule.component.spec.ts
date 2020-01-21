import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedScheduleComponent } from './accepted-schedule.component';

describe('AcceptedScheduleComponent', () => {
  let component: AcceptedScheduleComponent;
  let fixture: ComponentFixture<AcceptedScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
