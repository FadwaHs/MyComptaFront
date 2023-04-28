import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FilterService } from 'src/app/shared/services/filter.service';
import { FactureAcompteStatus } from '../../../enums/facture-acompte-status';
import { FactureAcompteService } from '../../../http/facture-acompte.service';
import { FactureAcompte } from '../../../models/facture-acompte';

@Component({
  selector: 'app-acompte',
  templateUrl: './acompte.component.html',
  styleUrls: ['./acompte.component.scss']
})
export class AcompteComponent {
  factureAcomptes :FactureAcompte[] = [];
  isEmpty : boolean = false;

  currentFactureAcompte: FactureAcompte = new FactureAcompte();
  currentIndex = -1;
  data :string = '';
  page :number = 1;
  filterStatus :FactureAcompteStatus ;
  count :number = 0;
  pageSize :number = 8;

  constructor(private factureAcompteService : FactureAcompteService, private filterService : FilterService) {
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
    await this.setAllFactureAcompte();
    console.log(this.factureAcomptes)
    if(this.factureAcomptes.length == 0) this.isEmpty = true
  }

  onRefresh(){
    this.setAllFactureAcompte();
  }


  async setAllFactureAcompte(){
    const params = this.getRequestParams(this.filterStatus,this.data, this.page, this.pageSize);
    await firstValueFrom(this.factureAcompteService.getFactureAcompteList(params))
    .then(res => {
      const { factureAcomptes, totalItems } = res;
      this.factureAcomptes = factureAcomptes;
      this.count = totalItems;
    }
    )
    .catch(console.log)

  }


  getRequestParams(filterStatus : FactureAcompteStatus,searchData: string, page: number, pageSize: number): any {
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
    this.setAllFactureAcompte();
  }

  pageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.setAllFactureAcompte();
  }

  searchData(): void {
    this.page = 1;
    this.setAllFactureAcompte();
  }
}
