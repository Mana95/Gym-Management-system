import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDietPlanComponent } from './view-diet-plan.component';

describe('ViewDietPlanComponent', () => {
  let component: ViewDietPlanComponent;
  let fixture: ComponentFixture<ViewDietPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDietPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDietPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
