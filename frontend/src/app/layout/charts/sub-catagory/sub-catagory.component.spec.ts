import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCatagoryComponent } from './sub-catagory.component';

describe('SubCatagoryComponent', () => {
  let component: SubCatagoryComponent;
  let fixture: ComponentFixture<SubCatagoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCatagoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
