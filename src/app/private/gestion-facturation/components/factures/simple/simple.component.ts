import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FilterService } from 'src/app/shared/services/filter.service';
import { FactureSimpleStatus } from '../../../enums/facture-simple-status';
import { FactureSimpleService } from '../../../http/facture-simple.service';
import { FactureSimple } from '../../../models/facture-simple';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss']
})
export class SimpleComponent {

  factureSimples :FactureSimple[] = [];
  isEmpty : boolean = false;

  currentFactureSimple: FactureSimple = new FactureSimple();
  currentIndex = -1;
  data :string = '';
  page :number = 1;
  filterStatus :FactureSimpleStatus ;
  count :number = 0;
  pageSize :number = 8;

  constructor(private factureSimpleService : FactureSimpleService, private filterService : FilterService) {
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
    await this.setAllFactureSimple();
    if(this.factureSimples.length == 0) this.isEmpty = true
  }

  onRefresh(){
    this.setAllFactureSimple();
  }


  async setAllFactureSimple(){
    const params = this.getRequestParams(this.filterStatus,this.data, this.page, this.pageSize);
    await firstValueFrom(this.factureSimpleService.getFactureSimpleList(params))
    .then(res => {
      const { factureSimples, totalItems } = res;
      this.factureSimples = factureSimples;
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
    this.setAllFactureSimple();
  }

  pageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.setAllFactureSimple();
  }

  searchData(): void {
    this.page = 1;
    this.setAllFactureSimple();
  }
}
