import { Component, OnInit } from '@angular/core';
import { Facture } from '../../models/facture';
import { FactureSimpleService } from '../../http/facture-simple.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { FactureAvoirService } from '../../http/facture-avoir.service';
import { FactureAcompteService } from '../../http/facture-acompte.service';
import { FactureService } from '../../http/facture.service';
import { FactureSimpleStatus } from '../../enums/facture-simple-status';
import { firstValueFrom } from 'rxjs';
import { NavigateService } from 'src/app/shared/services/navigate.service';

@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.scss']
})
export class FacturesComponent implements OnInit {

  constructor( public navigate: NavigateService ) {}

 ngOnInit(): void {

}

}
