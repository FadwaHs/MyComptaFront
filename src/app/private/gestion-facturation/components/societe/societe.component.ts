import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { PaginationControlsDirective } from 'ngx-pagination';
import { firstValueFrom, isEmpty } from 'rxjs';
import { FilterService } from 'src/app/shared/services/filter.service';
import { SocieteService } from '../../http/societe.service';
import { Societe } from '../../models/societe';

@Component({
  selector: 'app-societe',
  templateUrl: './societe.component.html',
  styleUrls: ['./societe.component.scss']
})
export class SocieteComponent implements OnInit{
  societes :Societe[] = [];
  isEmpty : boolean = false;

  currentSociete: Societe = new Societe();
  currentIndex = -1;
  data :string = '';
  page :number = 1;
  count :number = 0;
  pageSize :number = 8;

  constructor(private societeService : SocieteService, private filterService : FilterService) {
    this.filterService.methodSearchCalled$.subscribe(
      (data) => {
        this.data = data
        this.searchData()
      }
    );
  }

  async ngOnInit(): Promise<void> {
    await this.setAllSocietes();
    if(this.societes.length == 0) this.isEmpty = true
  }


  onRefresh(): void {
    this.setAllSocietes();
  }


  async setAllSocietes(){
    const params = this.getRequestParams(this.data, this.page, this.pageSize);
    await firstValueFrom(this.societeService.getSocieteList(params))
    .then(res => {
      const { societes, totalItems } = res;
      this.societes = societes;
      this.count = totalItems;
    }
    )
    .catch(console.log)



  }


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
    this.setAllSocietes();
  }

  pageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.setAllSocietes();
  }

  searchData(): void {
    this.page = 1;
    this.setAllSocietes();
  }

}
