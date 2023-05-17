import { Component, OnInit } from '@angular/core';
import { Facture } from '../../models/facture';
import { FactureSimpleService } from '../../http/facture-simple.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { FactureAvoirService } from '../../http/facture-avoir.service';
import { FactureAcompteService } from '../../http/facture-acompte.service';
import { FactureService } from '../../http/facture.service';
import { FactureSimpleStatus } from '../../enums/facture-simple-status';
import { firstValueFrom } from 'rxjs';

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


  constructor(private factureService:FactureService ,private filterService : FilterService) {
    this.filterService.methodSearchCalled$.subscribe(
      (res) => {
        this.data = res
        this.searchData()
      }
    );

    this.filterService.methodFilterStatusCalled$.subscribe(
      (res) => {
        this.filterStatus = res
        this.searchData()
      }
    );
}

async ngOnInit(): Promise<void> {

  await this.getFacture();
  if(this.facture.length == 0) this.isEmpty = true
}

onRefresh(){
  this.getFacture();
}

async getFacture() {

    // this.factureService.getAllFacture().subscribe({
    //   next :res=> this.facture=res,
    //   complete: () =>  { if(this.facture.length == 0) this.isEmpty = true }
    // }
    // )

    const params = this.getRequestParams(this.filterStatus,this.data, this.page, this.pageSize);
    await firstValueFrom(this.factureService.getFactureList(params))
    .then(res => {
      const { factures, totalItems } = res;
      this.facture = factures;
      this.count = totalItems;
    }
    )
    .catch(console.log)
  }

  getRequestParams(filterStatus : FactureSimpleStatus,searchData: string, page: number, pageSize: number): any {
    let params: any = {};

    if(filterStatus){
      params[`status`] = filterStatus;
    }

    if (searchData) {
      params[`data`] = searchData;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }


  pageChange(page: number): void {
    this.page = page;
    this.getFacture();
  }

  pageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.getFacture();
  }

  searchData(): void {
    this.page = 1;
    this.getFacture();

  }

}
