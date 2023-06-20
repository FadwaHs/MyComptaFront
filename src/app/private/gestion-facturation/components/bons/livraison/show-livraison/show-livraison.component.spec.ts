import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLivraisonComponent } from './show-livraison.component';

describe('ShowLivraisonComponent', () => {
  let component: ShowLivraisonComponent;
  let fixture: ComponentFixture<ShowLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowLivraisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
