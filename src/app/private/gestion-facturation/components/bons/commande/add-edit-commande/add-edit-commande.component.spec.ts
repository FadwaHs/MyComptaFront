import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCommandeComponent } from './add-edit-commande.component';

describe('AddEditCommandeComponent', () => {
  let component: AddEditCommandeComponent;
  let fixture: ComponentFixture<AddEditCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
