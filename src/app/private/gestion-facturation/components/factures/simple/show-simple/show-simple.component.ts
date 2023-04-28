import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FactureSimpleService } from 'src/app/private/gestion-facturation/http/facture-simple.service';
import { Facture } from 'src/app/private/gestion-facturation/models/facture';
import { FactureSimple } from 'src/app/private/gestion-facturation/models/facture-simple';
import { NavigateService } from 'src/app/shared/services/navigate.service';

@Component({
  selector: 'app-show-simple',
  templateUrl: './show-simple.component.html',
  styleUrls: ['./show-simple.component.scss']
})
export class ShowSimpleComponent implements OnInit {

  id: number;
  slug: string;
  facture: FactureSimple =new FactureSimple();


  constructor(private route: ActivatedRoute,
    private router: Router,
    private factureSimple: FactureSimpleService,
    protected navigate : NavigateService) { }

  ngOnInit(): void {

    this.checkRouteAndGetFacture();

  }

  async checkRouteAndGetFacture() {

    [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split(
      '-'
    );
    this.id = +this.id;
    if (this.id) {
      this.factureSimple.getFactureSimpleById(this.id).subscribe({
        next: (data) => (this.facture = data),
        error: (err) => console.log(err),
        complete: () => {
          this.checkSlug();
        },
      });
    } else {
      this.router.navigateByUrl(this.navigate.f_simplePath); //tester
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
