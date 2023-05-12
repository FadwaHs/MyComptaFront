import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOpportuniteComponent } from './show-opportunite.component';

describe('ShowOpportuniteComponent', () => {
  let component: ShowOpportuniteComponent;
  let fixture: ComponentFixture<ShowOpportuniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOpportuniteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowOpportuniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
