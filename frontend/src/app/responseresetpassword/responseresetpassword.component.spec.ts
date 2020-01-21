import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseresetpasswordComponent } from './responseresetpassword.component';

describe('ResponseresetpasswordComponent', () => {
  let component: ResponseresetpasswordComponent;
  let fixture: ComponentFixture<ResponseresetpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseresetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseresetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
