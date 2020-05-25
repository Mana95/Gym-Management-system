import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietIntervalsComponent } from './diet-intervals.component';

describe('DietIntervalsComponent', () => {
  let component: DietIntervalsComponent;
  let fixture: ComponentFixture<DietIntervalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietIntervalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietIntervalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
