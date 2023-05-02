import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiffreComponent } from './chiffre.component';

describe('ChiffreComponent', () => {
  let component: ChiffreComponent;
  let fixture: ComponentFixture<ChiffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
