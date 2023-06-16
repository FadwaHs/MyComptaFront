import { Component, OnInit } from '@angular/core';
import { Opportunite } from '../../models/opportunite';
import { OpportuniteService } from '../../http/opportunite.service';
import { OppStatus } from '../../enums/OppStatus';
import { FilterService } from 'src/app/shared/services/filter.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-opportunite',
  templateUrl: './opportunite.component.html',
  styleUrls: ['./opportunite.component.scss']
})

export class OpportuniteComponent implements OnInit {

  opportunite :Opportunite[] = [];
  isEmpty : boolean = false;
  filterStatus :OppStatus ;

  currentIndex = -1;
  data: string = '';
  page: number = 1;
  count: number = 0;
  pageSize: number = 8;

  originalOpportunite: Opportunite[];


constructor(private opportuniteService :OpportuniteService ,  private filterService : FilterService){

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

  await this.setAllOpportunites();

  if (this.opportunite.length === 0)
   this.isEmpty = true;

 }

 onRefresh(): void {
  this.setAllOpportunites();
}

async setAllOpportunites() {
  const params = this.getRequestParams(this.filterStatus, this.data, this.page, this.pageSize);
  try {
    const res = await firstValueFrom(this.opportuniteService.getListOpportunites(params));
    const { opportunites, totalItems } = res;

    this.opportunite = opportunites;

    this.count = totalItems;
  }
    catch (error) {
    console.log(error);
  }

}

getRequestParams( filterStatus: OppStatus, searchData: string, page: number , pageSize: number): any {
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
  this.setAllOpportunites();
}

pageSizeChange(pageSize: number): void {
  this.pageSize = pageSize;
  this.page = 1;
  this.setAllOpportunites();
}

searchData(): void {
  this.page = 1;
  this.setAllOpportunites();
}



//   ngOnInit(): any {

//   // For Filter
//   this.opportuniteService.getAllOpportunites().subscribe({

//     next: (opportuniteList) => {
//       this.opportunite = opportuniteList;
//       this.originalOpportunite = opportuniteList; // initialize originalOpportunite here
//     },
//     error: (error) => {
//       console.log(error);
//     },
//   });

//   // to retrieve the filter status and then she know which opportunities to display.
//   /* In the OpportuniteComponent, the getOppStatusFilter() method of the filterService is being subscribed to.
//    This means that whenever there is a change to the oppStatusFilterSubject,
//    the OpportuniteComponent will be notified of the change and can take appropriate action.*/
//   this.filterService.getOppStatusFilter().subscribe((status) => {
//     if (status) {

//       /*  filters the originalOpportunite array to only include items with a matching oppStatus value
//           and assigns the filtered array to the data property of the component*/
//       this.opportunite = this.originalOpportunite.filter(
//         (item) => item.oppStatus === status
//       );
//     } else {
//       // If status is falsy, assigns the entire originalOpportunite array to the data property of the component.

//       this.opportunite = this.originalOpportunite; // reset opportunite to originalOpportunite here
//     }
//   });

//   // For Filter end

//    this.getAllOpportunite();
// }




}
