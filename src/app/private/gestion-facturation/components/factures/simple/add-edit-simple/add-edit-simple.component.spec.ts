import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSimpleComponent } from './add-edit-simple.component';

describe('AddEditSimpleComponent', () => {
  let component: AddEditSimpleComponent;
  let fixture: ComponentFixture<AddEditSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSimpleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
