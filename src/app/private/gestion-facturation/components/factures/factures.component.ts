import { Component, OnInit } from '@angular/core';
import { Facture } from '../../models/facture';
import { FactureSimpleService } from '../../http/facture-simple.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { FactureAvoirService } from '../../http/facture-avoir.service';
import { FactureAcompteService } from '../../http/facture-acompte.service';
import { FactureService } from '../../http/facture.service';
import { FactureSimpleStatus } from '../../enums/facture-simple-status';

@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.scss']
})
export class FacturesComponent implements OnInit {

  isEmpty : boolean = false;
  facture :Facture[] = [];

  currentFacture: Facture = new Facture();
  currentIndex = -1;
  data :string = '';
  page :number = 1;
  filterStatus :FactureSimpleStatus ;
  count :number = 0;
  pageSize :number = 8;


  constructor(private factureService:FactureService ) {

}

async ngOnInit(): Promise<void> {

  await this.getFacture();
}

async getFacture() {

    this.factureService.getAllFacture().subscribe({
      next :res=> this.facture=res,
      complete: () =>  { if(this.facture.length == 0) this.isEmpty = true }
    }
    )
  }

}
