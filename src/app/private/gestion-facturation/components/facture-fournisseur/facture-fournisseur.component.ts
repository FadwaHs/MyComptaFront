import { Component } from '@angular/core';
import { NavigateService } from 'src/app/shared/services/navigate.service';

@Component({
  selector: 'app-facture-fournisseur',
  templateUrl: './facture-fournisseur.component.html',
  styleUrls: ['./facture-fournisseur.component.scss']
})
export class FactureFournisseurComponent {

  constructor( public navigate: NavigateService ) {}

}
