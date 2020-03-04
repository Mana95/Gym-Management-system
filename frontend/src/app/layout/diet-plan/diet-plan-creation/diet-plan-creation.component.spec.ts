import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietPlanCreationComponent } from './diet-plan-creation.component';

describe('DietPlanCreationComponent', () => {
  let component: DietPlanCreationComponent;
  let fixture: ComponentFixture<DietPlanCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietPlanCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietPlanCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
