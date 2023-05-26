import { Component, OnInit } from '@angular/core';
import { Opportunite } from '../../../models/opportunite';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { OpportuniteService } from '../../../http/opportunite.service';
import { Devis } from '../../../models/devis';

@Component({
  selector: 'app-show-opportunite',
  templateUrl: './show-opportunite.component.html',
  styleUrls: ['./show-opportunite.component.scss']
})


export class ShowOpportuniteComponent implements OnInit {

  id: number;
  slug: string;
  opportunite : Opportunite = new Opportunite();
  devisList : Devis[] =[]

  constructor(private route: ActivatedRoute,
    private router: Router,
    private opportuniteservice: OpportuniteService ,
    protected navigate : NavigateService) { }


  ngOnInit(): void {
    this.checkRouteAndGetOpp();
    this.getDevisForOpportunite()
  }


  async checkRouteAndGetOpp() {

    [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split(
      '-'
    );
    this.id = +this.id;
    if (this.id) {
      this.opportuniteservice.getOpportuniteById(this.id).subscribe({
        next: (data) => (this.opportunite = data),
        error: (err) => console.log(err),
        complete: () => {
          this.checkSlug();
        },
      });
    } else {
      this.router.navigateByUrl(this.navigate.f_opportunitePath); //tester
    }
  }


  checkSlug() {
    if (this.opportunite.slug != this.slug) {
      this.router.navigateByUrl(
        this.navigate.toShowPath('O',this.id,this.opportunite.slug)
      );
    }
  }

  getStatusColor(status: string): string {

    if (status === 'WON') {
      return 'text-green';
    } else if (status === 'CLOSED') {
      return 'text-red';
    } else if (status === 'LATE' || status === 'LOST') {
      return 'text-gray-4';
    } else if (status === 'CANCLED') {
      return 'text-red';
    } else if (status === 'INPROGRESS')
    {
       return 'text-yellow';
    }
     else {
      // Default color if status doesn't match any condition
      return 'text-gray-3';
    }
  }

  // get devis list
  getDevisForOpportunite() {
    [this.id, this.slug] =  this.route.snapshot.params['id-slug'].split(
      '-'
    );
    this.id = +this.id;
    this.opportuniteservice.getDevisForOpportunite(this.id).subscribe({
      next: (data) => (this.devisList = data),
      error: (e) => console.log(e),
    });

  }






}
