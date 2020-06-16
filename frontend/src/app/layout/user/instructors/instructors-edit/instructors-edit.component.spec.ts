import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsEditComponent } from './instructors-edit.component';

describe('InstructorsEditComponent', () => {
  let component: InstructorsEditComponent;
  let fixture: ComponentFixture<InstructorsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
