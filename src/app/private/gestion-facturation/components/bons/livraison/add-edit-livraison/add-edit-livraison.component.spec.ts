import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLivraisonComponent } from './add-edit-livraison.component';

describe('AddEditLivraisonComponent', () => {
  let component: AddEditLivraisonComponent;
  let fixture: ComponentFixture<AddEditLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLivraisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
