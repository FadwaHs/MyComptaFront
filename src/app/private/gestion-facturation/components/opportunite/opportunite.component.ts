import { Component, OnInit } from '@angular/core';
import { Opportunite } from '../../models/opportunite';
import { OpportuniteService } from '../../http/opportunite.service';
import { OppStatus } from '../../enums/OppStatus';
import { FilterService } from 'src/app/shared/services/filter.service';

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
  data :string = '';
  page :number = 1;
  count :number = 0;
  pageSize :number = 8;

constructor(private opportuniteService :OpportuniteService ,  private filterService : FilterService){

  this.filterService.methodSearchCalled$.subscribe(
    (res) => {
      this.data = res
      // this.searchData()
    }
  );

  this.filterService.methodFilterStatusCalled$.subscribe(
    (res) => {
      this.filterStatus = res
      // this.searchData()
    }
  );
}


  ngOnInit(): any {

   this.getAllOpportunite();

}


 getAllOpportunite() {

  this.opportuniteService.getAllOpportunites().subscribe({
    next :res=> this.opportunite=res,
    error:e=> console.log(e),
    complete: () =>  { if(this.opportunite.length == 0) this.isEmpty = true }
  }
  )
}










}
