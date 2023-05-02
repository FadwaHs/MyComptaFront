import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeboursComponent } from './debours.component';

describe('DeboursComponent', () => {
  let component: DeboursComponent;
  let fixture: ComponentFixture<DeboursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeboursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeboursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
