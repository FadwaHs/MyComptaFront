import {  DetailsService } from '../../../../../shared/services/details.service';
import { Article } from './../../../models/article';
import { Component, OnInit } from '@angular/core';
import { Devis } from '../../../models/devis';
import { DevisService } from '../../../http/devis.service';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { DevisStatus } from '../../../enums/devis-status';
import { firstValueFrom } from 'rxjs';
import { FactureAcompte } from '../../../models/facture-acompte';
import currencies from 'src/assets/json/currencies.json'


@Component({
  selector: 'app-show-devis',
  templateUrl: './show-devis.component.html',
  styleUrls: ['./show-devis.component.scss']
})

export class ShowDevisComponent implements OnInit {

  id: number;
  slug: string;
  devis: Devis = new Devis();
  currentStatus :string
  factureAcompteList: FactureAcompte[];
  items :any



  constructor(private route: ActivatedRoute,
    private router: Router,
    private devisService: DevisService,
    protected navigate : NavigateService,
   //++
    protected details :DetailsService

    ) {

     }

   async  ngOnInit() {
     await  this.checkRouteAndGetDevis();

    }



    async checkRouteAndGetDevis() {
      [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split(
        '-'
      );
      this.id = +this.id;
      if (this.id) {
        this.devisService.getDevisById(this.id).subscribe({
          next: (data) => (this.devis = data),
          error: (err) => console.log(err),
          complete: () => {
            this.checkSlug();
          },
        });
      } else {
        this.router.navigateByUrl(this.navigate.f_devisPath);
      }
    }

    checkSlug() {
      if (this.devis.slug != this.slug) {
        this.router.navigateByUrl(
          this.navigate.toShowPath('D',this.id,this.devis.slug)
        );
      }
    }




  }
