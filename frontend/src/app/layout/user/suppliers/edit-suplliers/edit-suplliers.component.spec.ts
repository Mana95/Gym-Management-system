import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSuplliersComponent } from './edit-suplliers.component';

describe('EditSuplliersComponent', () => {
  let component: EditSuplliersComponent;
  let fixture: ComponentFixture<EditSuplliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSuplliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSuplliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
