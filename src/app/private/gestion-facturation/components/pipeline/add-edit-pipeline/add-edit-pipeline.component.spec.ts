import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPipelineComponent } from './add-edit-pipeline.component';

describe('AddEditPipelineComponent', () => {
  let component: AddEditPipelineComponent;
  let fixture: ComponentFixture<AddEditPipelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPipelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
