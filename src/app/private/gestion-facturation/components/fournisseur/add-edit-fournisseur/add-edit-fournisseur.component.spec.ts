import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFournisseurComponent } from './add-edit-fournisseur.component';

describe('AddEditFournisseurComponent', () => {
  let component: AddEditFournisseurComponent;
  let fixture: ComponentFixture<AddEditFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
