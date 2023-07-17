import { Component, OnInit } from '@angular/core';
import { BonsCommande } from '../../../models/bons-commande';
import { BCStatus } from '../../../enums/BCStatus';
import { BonCommandeService } from '../../../http/bonCommande.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit{

  bonCommande :BonsCommande[] = [];
  isEmpty : boolean = false;

  currentIndex = -1;
  data: string = '';
  page: number = 1;
  filterStatus: BCStatus;
  count: number = 0;
  pageSize: number = 8;

  constructor(
    private bonCommandeService : BonCommandeService,
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

      await this.setAllBonCommande();

      if (this.bonCommande.length === 0)
       this.isEmpty = true;

    }

    onRefresh(): void {
      this.setAllBonCommande();
    }

    async setAllBonCommande() {
      const params = this.getRequestParams(this.filterStatus, this.data, this.page, this.pageSize);
      try {
        const res = await firstValueFrom(this.bonCommandeService.getListBonsCommande(params));
        const { bonCommande, totalItems } = res;

        this.bonCommande = bonCommande;

        this.count = totalItems;
      }
        catch (error) {
        console.log(error);
      }

    }
    getRequestParams( filterStatus: BCStatus, searchData: string, page: number , pageSize: number): any {
      let params: any = {};

      if (filterStatus) {
        params[`bcStatus`] = filterStatus;
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
      this.setAllBonCommande();
    }

    pageSizeChange(pageSize: number): void {
      this.pageSize = pageSize;
      this.page = 1;
      this.setAllBonCommande();
    }

    searchData(): void {
      this.page = 1;
      this.setAllBonCommande();
    }

}
