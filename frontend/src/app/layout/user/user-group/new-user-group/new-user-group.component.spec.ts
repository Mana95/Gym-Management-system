import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserGroupComponent } from './new-user-group.component';

describe('NewUserGroupComponent', () => {
  let component: NewUserGroupComponent;
  let fixture: ComponentFixture<NewUserGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
