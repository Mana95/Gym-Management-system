import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMemberStatusComponent } from './request-member-status.component';

describe('RequestMemberStatusComponent', () => {
  let component: RequestMemberStatusComponent;
  let fixture: ComponentFixture<RequestMemberStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestMemberStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestMemberStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
