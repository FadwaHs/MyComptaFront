import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { SocieteService } from '../../../http/societe.service';
import { Societe } from '../../../models/societe';
import { Devis } from '../../../models/devis';
import { Opportunite } from '../../../models/opportunite';
import { Facture } from '../../../models/facture';

@Component({
  selector: 'app-show-societe',
  templateUrl: './show-societe.component.html',
  styleUrls: ['./show-societe.component.scss'],
})
export class ShowSocieteComponent implements OnInit {
  id: number;
  slug: string;
  societe: Societe = new Societe();
  //++
  devisList : Devis[] =[]
  opportuniteList :Opportunite[] =[]
  factureList :Facture[]=[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private societeService: SocieteService,
    protected navigate : NavigateService
  ) {}

  ngOnInit() {
    this.checkRouteAndGetSociete();
    this.getDevisForSociete()
    this.getOpportunitForSociete()
    this.getFactureForSocietes()
  }

  async checkRouteAndGetSociete() {
    [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split(
      '-'
    );
    this.id = +this.id;
    if (this.id) {
      this.societeService.getSocieteById(this.id).subscribe({
        next: (data) => (this.societe = data),
        error: (err) => console.log(err),
        complete: () => {
          this.checkSlug();
        },
      });
    } else {
      this.router.navigateByUrl(this.navigate.f_societePath);
    }
  }

  checkSlug() {
    if (this.societe.slug != this.slug) {
      this.router.navigateByUrl(
        this.navigate.toShowPath('S',this.id,this.societe.slug)
      );
    }
  }

  //++
  getOpportunitForSociete() {
    [this.id, this.slug] =  this.route.snapshot.params['id-slug'].split(
      '-'
    );
    this.id = +this.id;
    this.societeService.getOpportunitesForSociete(this.id).subscribe({
      next: (data) => (this.opportuniteList = data),
      error: (e) => console.log(e),
    });
  }

  getDevisForSociete() {
    [this.id, this.slug] =  this.route.snapshot.params['id-slug'].split(
      '-'
    );
    this.id = +this.id;
    this.societeService.getDevisForSociete(this.id).subscribe({
      next: (data) => (this.devisList = data),
      error: (e) => console.log(e),
      complete: () => {
        console.log(this.devisList[0].code,'devis')
      },

    });

  }

  getFactureForSocietes() {
    [this.id, this.slug] =  this.route.snapshot.params['id-slug'].split(
      '-'
    );
    this.id = +this.id;
    this.societeService.getFactureForSociete(this.id).subscribe({
      next: (data) => (this.factureList = data),
      error: (e) => console.log(e),
      complete: () => {
        console.log(this.factureList[0].code,'cccc')
      },
    });

  }


}
