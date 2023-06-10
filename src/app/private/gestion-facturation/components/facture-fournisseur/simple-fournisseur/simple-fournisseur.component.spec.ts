import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleFournisseurComponent } from './simple-fournisseur.component';

describe('SimpleFournisseurComponent', () => {
  let component: SimpleFournisseurComponent;
  let fixture: ComponentFixture<SimpleFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleFournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
