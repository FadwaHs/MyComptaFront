import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FilterService } from 'src/app/shared/services/filter.service';
import { DevisStatus } from '../../enums/devis-status';
import { DevisService } from '../../http/devis.service';
import { Devis } from '../../models/devis';
import { ShareDataService } from 'src/app/shared/services/shareData.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.scss']
})
export class DevisComponent implements OnInit {

  devis :Devis[] = [];
  isEmpty : boolean = false;

  currentDevis: Devis = new Devis();
  currentIndex = -1;
  data :string = '';
  page :number = 1;
  filterStatus :DevisStatus ;
  count :number = 0;
  pageSize :number = 8;



  constructor(private devisService : DevisService, private filterService : FilterService
    ) {
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
    await this.setAllDevis();
    if(this.devis.length == 0) this.isEmpty = true

    this.filterService.getselectedItemSubject().subscribe((dateselected) => {

      if (dateselected) {
        switch (dateselected) {
          case 'Trier Par : Date De Création':
            this.devis.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            break;
          case 'Trier Par : Date De Finalisation':
              this.devis.sort((a, b) => new Date(b.date_finalisation).getTime() - new Date(a.date_finalisation).getTime());
              break;
          case 'Trier Par : Date de signature':
                this.devis.sort((a, b) => new Date(b.date_signature).getTime() - new Date(a.date_signature).getTime());
                break;
          default:
            break;
        }
      }
    });
  }

  onRefresh(){
    this.setAllDevis();
  }


  async setAllDevis(){
    const params = this.getRequestParams(this.filterStatus,this.data, this.page, this.pageSize);
    await firstValueFrom(this.devisService.getDevisList(params))
    .then(res => {
      const { devis, totalItems } = res;
      this.devis = devis;
      this.count = totalItems;
    }
    )
    .catch(console.log)

  }


  getRequestParams(filterStatus : DevisStatus,searchData: string, page: number, pageSize: number): any {
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
    this.setAllDevis();
  }

  pageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.setAllDevis();
  }

  searchData(): void {
    this.page = 1;
    this.setAllDevis();


  }


}
