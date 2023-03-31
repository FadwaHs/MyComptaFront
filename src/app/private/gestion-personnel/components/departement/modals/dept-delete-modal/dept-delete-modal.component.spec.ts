import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptDeleteModalComponent } from './dept-delete-modal.component';

describe('DeptDeleteModalComponent', () => {
  let component: DeptDeleteModalComponent;
  let fixture: ComponentFixture<DeptDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptDeleteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeptDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
