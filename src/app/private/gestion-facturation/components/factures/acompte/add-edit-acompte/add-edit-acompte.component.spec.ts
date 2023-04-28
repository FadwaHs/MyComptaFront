import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAcompteComponent } from './add-edit-acompte.component';

describe('AddEditAcompteComponent', () => {
  let component: AddEditAcompteComponent;
  let fixture: ComponentFixture<AddEditAcompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAcompteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAcompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
