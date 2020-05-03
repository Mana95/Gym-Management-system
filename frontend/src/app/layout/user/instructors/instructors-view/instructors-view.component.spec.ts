import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsViewComponent } from './instructors-view.component';

describe('InstructorsViewComponent', () => {
  let component: InstructorsViewComponent;
  let fixture: ComponentFixture<InstructorsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
