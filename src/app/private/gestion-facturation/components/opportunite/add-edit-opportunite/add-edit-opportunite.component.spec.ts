import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOpportuniteComponent } from './add-edit-opportunite.component';

describe('AddEditOpportuniteComponent', () => {
  let component: AddEditOpportuniteComponent;
  let fixture: ComponentFixture<AddEditOpportuniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditOpportuniteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditOpportuniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
