import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BonLivraisonService } from 'src/app/private/gestion-facturation/http/bonLivraison.service';
import { BonLivraison } from 'src/app/private/gestion-facturation/models/bons-livraison';
import { DetailsService } from 'src/app/shared/services/details.service';
import { NavigateService } from 'src/app/shared/services/navigate.service';

@Component({
  selector: 'app-show-livraison',
  templateUrl: './show-livraison.component.html',
  styleUrls: ['./show-livraison.component.scss']
})
export class ShowLivraisonComponent implements OnInit {


  id: number;
  slug: string;
  bonlivraison: BonLivraison = new BonLivraison();
  currentStatus :string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bonLivraisonService: BonLivraisonService,
    protected navigate : NavigateService,
    protected details :DetailsService

    ) {

     }

  async  ngOnInit() {

  await  this.checkRouteAndGetBL();

  }



     async checkRouteAndGetBL() {
       [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split(
         '-'
       );
       this.id = +this.id;
       if (this.id) {
         this.bonLivraisonService.getBonLivraisonById(this.id).subscribe({
           next: (data) => (this.bonlivraison = data),
           error: (err) => console.log(err),
           complete: () => {
             this.checkSlug();
           },
         });
       } else {
         this.router.navigateByUrl(this.navigate.f_livraisonPath);
       }
     }

     checkSlug() {
       if (this.bonlivraison.slug != this.slug) {
         this.router.navigateByUrl(
           this.navigate.toShowPath('BL',this.id,this.bonlivraison.slug)
         );
       }
     }


     getStatusColor(status: string): string {

      if (status === 'Invoiced') {
        return 'text-green';
      } else if (status === 'Draft') {
        return 'text-red';
      } else if (status === 'Partially_Invoiced') {
        return 'text-blue';
      }
       else {
        return 'text-gray-3';
      }


}


}
