import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FactureAvoirStatus } from 'src/app/private/gestion-facturation/enums/facture-avoir-status';
import { FactureAvoirService } from 'src/app/private/gestion-facturation/http/facture-avoir.service';
import { FactureAvoir } from 'src/app/private/gestion-facturation/models/facture-avoir';
import { FilterService } from 'src/app/shared/services/filter.service';

@Component({
  selector: 'app-avoir',
  templateUrl: './avoir.component.html',
  styleUrls: ['./avoir.component.scss']
})
export class AvoirComponent {
  factureAvoirs :FactureAvoir[] = [];
  isEmpty : boolean = false;

  currentFactureAvoir: FactureAvoir = new FactureAvoir();
  currentIndex = -1;
  data :string = '';
  page :number = 1;
  filterStatus :FactureAvoirStatus ;
  count :number = 0;
  pageSize :number = 8;

  constructor(private factureAvoirService : FactureAvoirService, private filterService : FilterService) {
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
    await this.setAllFactureAvoir();
    if(this.factureAvoirs.length == 0) this.isEmpty = true
  }

  onRefresh(){
    this.setAllFactureAvoir();
  }


  async setAllFactureAvoir(){
    const params = this.getRequestParams(this.filterStatus,this.data, this.page, this.pageSize);
    await firstValueFrom(this.factureAvoirService.getFactureAvoirList(params))
    .then(res => {
      const { factureAvoirs, totalItems } = res;
      this.factureAvoirs = factureAvoirs;
      this.count = totalItems;
    }
    )
    .catch(console.log)

  }


  getRequestParams(filterStatus : FactureAvoirStatus,searchData: string, page: number, pageSize: number): any {
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
    this.setAllFactureAvoir();
  }

  pageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.setAllFactureAvoir();
  }

  searchData(): void {
    this.page = 1;
    this.setAllFactureAvoir();
  }
}
