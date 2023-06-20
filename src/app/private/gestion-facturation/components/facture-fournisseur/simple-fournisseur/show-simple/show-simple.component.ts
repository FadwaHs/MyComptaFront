import { FournisseurService } from 'src/app/private/gestion-facturation/http/fournisseur.service';
import { SimpleFournisseurService } from './../../../../http/simple-fournisseur.service';
import { Fournisseur } from 'src/app/private/gestion-facturation/models/fournisseur';
import { Component } from '@angular/core';
import { SimpleFournisseur } from 'src/app/private/gestion-facturation/models/simple-fournisseur';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsService } from 'src/app/shared/services/details.service';
import { SimpleFournisseurStatus } from 'src/app/private/gestion-facturation/enums/simple-fournisseur-status';

@Component({
  selector: 'app-show-simple',
  templateUrl: './show-simple.component.html',
  styleUrls: ['./show-simple.component.scss']
})
export class ShowSimpleComponent {

  id: number;
  slug: string;
  facture: SimpleFournisseur =new SimpleFournisseur();
  items :any

  constructor(private route: ActivatedRoute,
    private router: Router,
    private simpleFournisseurService: SimpleFournisseurService,
    protected navigate : NavigateService,
    protected details :DetailsService,
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
      this.simpleFournisseurService.getSimpleFourById(this.id).subscribe({
        next: (data) => (this.facture = data),
        error: (err) => console.log(err),
        complete: () => {
          this.checkSlug();
        },
      });
    } else {
      this.router.navigateByUrl(this.navigate.f_simpleFournisseurPath);
    }
  }

  checkSlug() {
    if (this.facture.slug != this.slug) {
      this.router.navigateByUrl(
        this.navigate.toShowPath('SF',this.id,this.facture.slug)
      );
    }
  }
 getStatutsColor(statuts :any):string{
  if (statuts ==="LATE")
     return 'text-red';
  else if (statuts ==="CANCELLED")
     return 'text-red';
  else if (statuts === "PARTIAL"||statuts ==="PARTIAL_DELIVERY")
     return 'text-yellow';
  else if (statuts ==="TOBERESOLVED")
     return'text-blue';
  else if (statuts ==="PAID"||statuts === "DELIVERED")
     return 'text-green'
  // else if (statuts === "PARTIAL_DELIVERY")
  //    return 'text-yellow';
  // else if (statuts === "DELIVERED")
  //    return 'text-green';


return 'text-gray-4';

}
 }


