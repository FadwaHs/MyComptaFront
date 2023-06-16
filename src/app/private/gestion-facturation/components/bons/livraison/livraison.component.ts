import { Component, OnInit } from '@angular/core';
import { BonLivraison } from '../../../models/bons-livraison';
import { FilterService } from 'src/app/shared/services/filter.service';
import { BonLivraisonService } from '../../../http/bonLivraison.service';
import { BLStatus } from '../../../enums/BLStatus';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.scss']
})

export class LivraisonComponent implements OnInit{

  bonLivraison :BonLivraison[] = [];
  isEmpty : boolean = false;

  currentIndex = -1;
  data: string = '';
  page: number = 1;
  filterStatus: BLStatus;
  count: number = 0;
  pageSize: number = 8;


  constructor(
    private bonLivraisonService : BonLivraisonService,
    private filterService : FilterService){

      this.filterService.methodSearchCalled$.subscribe((res) => {
        this.data = res;
        this.searchData();
      });

      this.filterService.methodFilterStatusCalled$.subscribe((res) => {
        this.filterStatus = res;
        this.searchData();
      });
    }


  async ngOnInit(): Promise<void>{

    await this.setAllBonLivraison();

    if (this.bonLivraison.length === 0)
     this.isEmpty = true;

   }

   onRefresh(): void {
    this.setAllBonLivraison();
  }

  async setAllBonLivraison() {
    const params = this.getRequestParams(this.filterStatus, this.data, this.page, this.pageSize);
    try {
      const res = await firstValueFrom(this.bonLivraisonService.getListBonLivraison(params));
      const { bonlivraison, totalItems } = res;

      this.bonLivraison = bonlivraison;

      this.count = totalItems;
    }
      catch (error) {
      console.log(error);
    }

  }

  getRequestParams( filterStatus: BLStatus, searchData: string, page: number , pageSize: number): any {
    let params: any = {};

    if (filterStatus) {
      params[`blStatus`] = filterStatus;
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
    this.setAllBonLivraison();
  }

  pageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.setAllBonLivraison();
  }

  searchData(): void {
    this.page = 1;
    this.setAllBonLivraison();
  }

}
