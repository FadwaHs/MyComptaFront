import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAvoirComponent } from './add-edit-avoir.component';

describe('AddEditAvoirComponent', () => {
  let component: AddEditAvoirComponent;
  let fixture: ComponentFixture<AddEditAvoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAvoirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAvoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
