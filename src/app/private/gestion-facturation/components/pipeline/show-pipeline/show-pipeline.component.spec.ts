import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPipelineComponent } from './show-pipeline.component';

describe('ShowPipelineComponent', () => {
  let component: ShowPipelineComponent;
  let fixture: ComponentFixture<ShowPipelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPipelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
