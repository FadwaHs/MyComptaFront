import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAcompteComponent } from './show-acompte.component';

describe('ShowAcompteComponent', () => {
  let component: ShowAcompteComponent;
  let fixture: ComponentFixture<ShowAcompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAcompteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAcompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
