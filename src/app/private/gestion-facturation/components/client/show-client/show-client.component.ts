import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { ClientService } from '../../../http/client.service';
import { Client } from '../../../models/client';
import { Devis } from '../../../models/devis';
import { Opportunite } from '../../../models/opportunite';


@Component({
  selector: 'app-show-client',
  templateUrl: './show-client.component.html',
  styleUrls: ['./show-client.component.scss'],
})
export class ShowClientComponent implements OnInit {
  id: number;
  slug: string;
  client: Client = new Client();
  devisList : Devis[] =[]
  opportuniteList :Opportunite[] =[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    public navigate : NavigateService
  ) {}

  ngOnInit() {
    this.checkRouteAndGetClient();
    if(this.client.societe)
    this.navigate.toShowPath('C',this.client.societe.id,this.client.societe.slug)
    this.getDevisForClient()
    this.getOpportunitForClient()
  }

  getOpportunitForClient() {
    [this.id, this.slug] =  this.route.snapshot.params['id-slug'].split(
      '-'
    );
    this.id = +this.id;
    this.clientService.getOpportunitesForClient(this.id).subscribe({
      next: (data) => (this.opportuniteList = data),
      error: (e) => console.log(e),
    });
  }

  getDevisForClient() {
    [this.id, this.slug] =  this.route.snapshot.params['id-slug'].split(
      '-'
    );
    this.id = +this.id;
    this.clientService.getDevisForClient(this.id).subscribe({
      next: (data) => (this.devisList = data),
      error: (e) => console.log(e),
    });

  }

  async checkRouteAndGetClient() {
    [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split(
      '-'
    );
    this.id = +this.id;
    if (this.id) {
      this.clientService.getClientById(this.id).subscribe({
        next: (data) => (this.client = data),
        error: (e) => console.log(e),
        complete: () => {
          this.checkSlug()
        },
      });
    } else {
      this.router.navigateByUrl(this.navigate.f_clientPath);
    }
  }

  checkSlug() {
    if (this.client.slug != this.slug) {
      this.router.navigateByUrl(this.navigate.toShowPath('C',this.id,this.client.slug));
    }
  }



}
