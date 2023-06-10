import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvoirFournisseurComponent } from './avoir-fournisseur.component';

describe('AvoirFournisseurComponent', () => {
  let component: AvoirFournisseurComponent;
  let fixture: ComponentFixture<AvoirFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvoirFournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvoirFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
