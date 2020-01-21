import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePlanComponent } from './schedule-plan.component';

describe('SchedulePlanComponent', () => {
  let component: SchedulePlanComponent;
  let fixture: ComponentFixture<SchedulePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
