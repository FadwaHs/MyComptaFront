import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FilterService } from 'src/app/shared/services/filter.service';
import { ClientService } from '../../http/client.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class  ClientComponent implements OnInit {

  clients :Array<Client> = []
  isEmpty : boolean = false;

  currentClient: Client = new Client();
  currentIndex = -1;
  data :string = '';
  page :number = 1;
  count :number = 0;
  pageSize :number = 8;

  constructor(private clientService : ClientService, private filterService : FilterService) {
    this.filterService.methodSearchCalled$.subscribe(
      (data) => {
        this.data = data
        this.searchData()
      }
    );
  }

  async ngOnInit(): Promise<void> {
    await this.setAllClients();
    if(this.clients.length == 0) this.isEmpty = true
  }


  async setAllClients(){
    const params = this.getRequestParams(this.data, this.page, this.pageSize);
    await firstValueFrom(this.clientService.getClientList(params))
    .then(res => {
      const { clients, totalItems } = res;
      this.clients = clients;
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
    this.setAllClients();
  }

  pageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.setAllClients();
  }

  searchData(): void {
    this.page = 1;
    this.setAllClients();
  }

}
