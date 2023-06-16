import { Component } from '@angular/core';
import { SimpleFournisseur } from '../../../models/simple-fournisseur';
import { SimpleFournisseurStatus } from '../../../enums/simple-fournisseur-status';
import { SimpleFournisseurService } from '../../../http/simple-fournisseur.service';
import { FilterService } from 'src/app/shared/services/filter.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-simple-fournisseur',
  templateUrl: './simple-fournisseur.component.html',
  styleUrls: ['./simple-fournisseur.component.scss']
})
export class SimpleFournisseurComponent {

  factureFournissuers: SimpleFournisseur[] = [];
  isEmpty: boolean = false;

  currentFactureFournisseur: SimpleFournisseur = new SimpleFournisseur();
  currentIndex = -1;
  data: string = '';
  page: number = 1;
  filterStatus: SimpleFournisseurStatus;
  count: number = 0;
  pageSize: number = 8;

  constructor(
    private simpleFournisseurService: SimpleFournisseurService,
    private filterService: FilterService
  ) {
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
   await this.setAllSimpleFournisseur();
   if (this.factureFournissuers.length === 0)
    this.isEmpty = true;

  }

  onRefresh(): void {
    this.setAllSimpleFournisseur();
  }

  async setAllSimpleFournisseur() {
    const params = this.getRequestParams(this.filterStatus, this.data, this.page, this.pageSize);
    try {
      const res = await firstValueFrom(this.simpleFournisseurService.getSimpleFourList(params));
      const { facturesfournisseur, totalItems } = res;
      this.factureFournissuers = facturesfournisseur;
      this.count = totalItems;

    } catch (error) {
      console.log(error);
    }
  }

  getRequestParams(
    filterStatus: SimpleFournisseurStatus,
    searchData: string,
    page: number,
    pageSize: number
  ): any {
    let params: any = {};

    if (filterStatus) {
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
    this.setAllSimpleFournisseur();
  }

  pageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.setAllSimpleFournisseur();
  }

  searchData(): void {
    this.page = 1;
    this.setAllSimpleFournisseur();
  }
}
