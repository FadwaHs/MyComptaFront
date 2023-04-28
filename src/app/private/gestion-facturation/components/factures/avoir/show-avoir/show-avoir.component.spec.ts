import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAvoirComponent } from './show-avoir.component';

describe('ShowAvoirComponent', () => {
  let component: ShowAvoirComponent;
  let fixture: ComponentFixture<ShowAvoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAvoirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAvoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
