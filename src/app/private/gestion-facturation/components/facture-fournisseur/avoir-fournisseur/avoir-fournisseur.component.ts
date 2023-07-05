import { AvoirFournisseurService } from './../../../http/avoir-fournisseur.service';
import { AvoireFournisseurStatus } from '../../../enums/avoire-fournisseur-status';
import { AvoireFournisseur } from './../../../models/avoir-fournisseur';
import { Component } from '@angular/core';
import { FilterService } from 'src/app/shared/services/filter.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-avoir-fournisseur',
  templateUrl: './avoir-fournisseur.component.html',
  styleUrls: ['./avoir-fournisseur.component.scss']
})
export class AvoirFournisseurComponent {

  avoirFournissuers : AvoireFournisseur[]=[]
  isEmpty: boolean = false;

  currentFactureFournisseur: AvoireFournisseur = new AvoireFournisseur();
  currentIndex = -1;
  data: string = '';
  page: number = 1;
  filterStatus: AvoireFournisseurStatus;
  count: number = 0;
  pageSize: number = 8;

  constructor(
    private avoirFournisseurService :AvoirFournisseurService,
    private filterService: FilterService

  ){
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
    await this.setAllAvoirFournisseur();
    if (this.avoirFournissuers.length === 0)
     this.isEmpty = true;
   }

   onRefresh(): void {
    this.setAllAvoirFournisseur();
  }

  async setAllAvoirFournisseur() {
    const params = this.getRequestParams(this.filterStatus, this.data, this.page, this.pageSize);
    try {
      const res = await firstValueFrom(this.avoirFournisseurService.getAvoirFourList(params));
      const { avoirsfournisseur, totalItems } = res;
      this.avoirFournissuers = avoirsfournisseur;
      this.count = totalItems;

    } catch (error) {
      console.log(error);
    }
  }

  getRequestParams(
    filterStatus: AvoireFournisseurStatus,
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
    this.setAllAvoirFournisseur();
  }

  pageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.setAllAvoirFournisseur();
  }

  searchData(): void {
    this.page = 1;
    this.setAllAvoirFournisseur();
  }

}
