import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwScheduleComponent } from './veiw-schedule.component';

describe('VeiwScheduleComponent', () => {
  let component: VeiwScheduleComponent;
  let fixture: ComponentFixture<VeiwScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiwScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiwScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
