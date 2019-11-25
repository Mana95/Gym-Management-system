import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNewCatagoryComponent } from './main-new-catagory.component';

describe('MainNewCatagoryComponent', () => {
  let component: MainNewCatagoryComponent;
  let fixture: ComponentFixture<MainNewCatagoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainNewCatagoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNewCatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
