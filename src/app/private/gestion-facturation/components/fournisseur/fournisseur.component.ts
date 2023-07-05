import { Component } from '@angular/core';
import { Fournisseur } from '../../models/fournisseur';
import { FilterService } from 'src/app/shared/services/filter.service';
import { FournisseurService } from '../../http/fournisseur.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent {
  fournisseurs :Array<Fournisseur> = []
  isEmpty : boolean = false;
  currentFournisseur: Fournisseur = new Fournisseur();
  currentIndex = -1;
  data :string = '';
  page :number = 1;
  count :number = 0;
  pageSize :number = 8;


  constructor(private fournisseurService : FournisseurService, private filterService : FilterService) {
    this.filterService.methodSearchCalled$.subscribe(
      (data) => {
        this.data = data
         this.searchData()
      }
    );
  }


  async ngOnInit(): Promise<void> {
    await this.setAllFournisseurs();
    if(this.fournisseurs.length == 0) this.isEmpty = true
  }

  onRefresh(): void {
    this.setAllFournisseurs();
  }


  async setAllFournisseurs(){

    const params = this.getRequestParams(this.data, this.page, this.pageSize);
    await firstValueFrom(this.fournisseurService.getFournisseurList(params))
    .then(res => {
      const { fournisseurs, totalItems } = res;
      this.fournisseurs = fournisseurs;
      this.count = totalItems;
    }
    )
    .catch(console.log)
  }

  // async setAllFournisseurs(){
  //   const params = this.getRequestParams(this.data, this.page, this.pageSize);
  //   await firstValueFrom(this.fournisseurService. getFournisseurList(params))
  //   .then(res => {
  //     const { fournisseurs, totalItems } = res;
  //     this.fournisseurs = fournisseurs;
  //     this.count = totalItems;
  //   }
  //   )
  //   .catch(console.log)
  // }


  getRequestParams(searchData: string, page: number, pageSize: number): any {
    let params: any = {};

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
    this.setAllFournisseurs();
  }

  pageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.setAllFournisseurs();
  }

  searchData(): void {
    this.page = 1;
    this.setAllFournisseurs();
  }

}
