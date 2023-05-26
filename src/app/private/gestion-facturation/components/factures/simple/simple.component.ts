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

  selectedDate: string = 'Trier Par : Date De Création';

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

    this.filterService.getselectedItemSubject().subscribe((dateselected) => {

      if (dateselected) {
        switch (dateselected) {
          case 'Trier Par : Date De Création':
            this.factureSimples.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            break;
          case 'Trier Par : Date De Finalisation':
              this.factureSimples.sort((a, b) => new Date(b.date_finalisation).getTime() - new Date(a.date_finalisation).getTime());
              break;
          case 'Trier Par : Date De Paiement':
                this.factureSimples.sort((a, b) => new Date(b.date_paiement).getTime() - new Date(a.date_paiement).getTime());
                break;
          default:
            break;
        }
      }
    });
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
