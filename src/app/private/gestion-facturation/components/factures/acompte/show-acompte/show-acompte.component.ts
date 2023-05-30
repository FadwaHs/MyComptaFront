import { FactureAcompteService } from './../../../../http/facture-acompte.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/private/gestion-facturation/http/client.service';
import { DevisService } from 'src/app/private/gestion-facturation/http/devis.service';
import { Devis } from 'src/app/private/gestion-facturation/models/devis';
import { FactureAcompte } from 'src/app/private/gestion-facturation/models/facture-acompte';
import { Societe } from 'src/app/private/gestion-facturation/models/societe';
import { DetailsService } from 'src/app/shared/services/details.service';
import { NavigateService } from 'src/app/shared/services/navigate.service';

@Component({
  selector: 'app-show-acompte',
  templateUrl: './show-acompte.component.html',
  styleUrls: ['./show-acompte.component.scss']
})
export class ShowAcompteComponent {

  id: number;
  slug: string;
  facture: FactureAcompte =new FactureAcompte();
  items :any
  clientId :number |undefined
  societe :Societe |undefined
  devis :Devis =new Devis()


  constructor(private route: ActivatedRoute,
    private router: Router,
    private FactureAcompteService: FactureAcompteService,
    protected navigate : NavigateService,
    protected details :DetailsService,
    private devisService: DevisService,
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
        this.FactureAcompteService.getFactureAcompteById(this.id).subscribe({
          next: (data) => (this.facture = data),
          error: (err) => console.log(err),
          complete: () => {
            this.devis = this.facture.devis

            console.log(this.devis ,"devvvv")
            console.log(this.facture.devis ,"fffdevvvv")

            this.clientId =this.devis.client?.id
            this.getSocieteForDevisClient()
            this.checkSlug();
          },
        });
      } else {
        this.router.navigateByUrl(this.navigate.f_simplePath); //tester
      }
    }

    getSocieteForDevisClient(){
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
          this.navigate.toShowPath('F',this.id,this.facture.slug)
        );
      }
    }


}
