import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetmembershipComponent } from './getmembership.component';

describe('GetmembershipComponent', () => {
  let component: GetmembershipComponent;
  let fixture: ComponentFixture<GetmembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetmembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetmembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
