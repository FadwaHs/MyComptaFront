import { DepartementService } from './../../../http/departement.service';
import { Departement } from './../../../models/departement';
import { ModalComponent } from './../../../../shared/directives/modal.components';
import { ModalService } from './../../../../shared/services/modal.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FilterService } from 'src/app/shared/services/filter.service';
import { firstValueFrom } from 'rxjs';
import { Card } from 'src/app/shared/models/card';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit{

  cards : Card[] = []
  departements :Array<Departement> = []
  isEmpty : boolean = false;


  currentDepartement: Departement = new Departement();
  currentIndex = -1;
  data :string = '';
  page :number = 1;
  count :number = 0;
  pageSize :number = 8;


  constructor(private modalService : ModalService,private filterService : FilterService, private departementService:DepartementService)
  {
    this.filterService.methodSearchCalled$.subscribe(
      (data) => {
        this.data = data
        this.searchData()
      }
    );  }

    async ngOnInit(): Promise<void> {
      await this.setAllDepts();
      this.setCards()
      if(this.departements.length == 0) this.isEmpty = true
    }


    async setAllDepts() {

      const params = this.getRequestParams(this.data, this.page, this.pageSize);
      await firstValueFrom(this.departementService.getDepartementList(params))
      .then(res => {
        const { departements, totalItems } = res;
        this.departements = departements;
        this.count = totalItems;

      }
      )
      .catch(console.log)
    }


    setCards() {
      console.log(this.departements)
      this.departements.forEach(departement =>{
        console.log(departement)
        var card : Card  = {} as Card
        card.id = departement.id.toString()
        card.mainIcon= 'societes'
        card.primaryTitle1 = departement.nom
        card.secondaryTitle = '#'+departement.designation
        // card.paragraph = departement.description
        this.cards.push(card)
      })

      console.log(this.cards)

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
      this.setAllDepts();
    }

    pageSizeChange(pageSize: number): void {
      this.pageSize = pageSize;
      this.page = 1;
      this.setAllDepts();
    }

    searchData(): void {
      this.page = 1;
      this.setAllDepts();
    }


  openModel() {
    this.modalService.open()
  }

}


