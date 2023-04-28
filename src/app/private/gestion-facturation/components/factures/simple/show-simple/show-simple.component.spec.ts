import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSimpleComponent } from './show-simple.component';

describe('ShowSimpleComponent', () => {
  let component: ShowSimpleComponent;
  let fixture: ComponentFixture<ShowSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSimpleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
