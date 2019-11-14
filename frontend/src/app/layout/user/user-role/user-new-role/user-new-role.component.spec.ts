import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewRoleComponent } from './user-new-role.component';

describe('UserNewRoleComponent', () => {
  let component: UserNewRoleComponent;
  let fixture: ComponentFixture<UserNewRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNewRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNewRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
