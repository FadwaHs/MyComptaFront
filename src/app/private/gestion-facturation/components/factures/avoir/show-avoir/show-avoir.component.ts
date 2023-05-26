import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/private/gestion-facturation/http/client.service';
import { FactureAvoirService } from 'src/app/private/gestion-facturation/http/facture-avoir.service';
import { FactureAvoir } from 'src/app/private/gestion-facturation/models/facture-avoir';
import { Societe } from 'src/app/private/gestion-facturation/models/societe';
import { DetailsService } from 'src/app/shared/services/details.service';
import { NavigateService } from 'src/app/shared/services/navigate.service';

@Component({
  selector: 'app-show-avoir',
  templateUrl: './show-avoir.component.html',
  styleUrls: ['./show-avoir.component.scss']
})
export class ShowAvoirComponent implements OnInit {

  id: number;
  slug: string;
  facture: FactureAvoir =new FactureAvoir();
  items :any
  clientId :number |undefined
  societe :Societe |undefined

  constructor(private route: ActivatedRoute,
    private router: Router,
    private factureAvoir: FactureAvoirService,
    protected navigate : NavigateService,
    protected details :DetailsService,
    private clientService:ClientService
    ) { }


  ngOnInit(): void {

    this.checkRouteAndGetFacture();

  }

  async checkRouteAndGetFacture() {

    [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split(
      '-'
    );
    this.id = +this.id;
    if (this.id) {
      this.factureAvoir.getFactureAvoirById(this.id).subscribe({
        next: (data) => (this.facture = data),
        error: (err) => console.log(err),
        complete: () => {
          this.clientId = this.facture.client?.id
          this.getSociete()
          this.checkSlug();
        },
      });
    } else {
      this.router.navigateByUrl(this.navigate.f_avoirPath);
    }
  }

  getSociete(){
    if(this.clientId){
      this.clientService.getSocieteForClient(this.clientId).subscribe({
        next: (data) => (this.societe = data),
        error: (err) => console.log(err),
      });
    }
  }

  checkSlug() {
    if (this.facture.slug != this.slug) {
      this.router.navigateByUrl(
        this.navigate.toShowPath('A',this.id,this.facture.slug)
      );
    }
  }



}
