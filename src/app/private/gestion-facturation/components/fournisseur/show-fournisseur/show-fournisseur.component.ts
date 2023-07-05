import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../../../models/fournisseur';
import { BonLivraison } from '../../../models/bons-livraison';
import { BonsCommande } from '../../../models/bons-commande';
import { SimpleFournisseur } from '../../../models/simple-fournisseur';
import { AvoireFournisseur } from '../../../models/avoir-fournisseur';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { FournisseurService } from '../../../http/fournisseur.service';

@Component({
  selector: 'app-show-fournisseur',
  templateUrl: './show-fournisseur.component.html',
  styleUrls: ['./show-fournisseur.component.scss']
})
export class ShowFournisseurComponent implements OnInit{

  id: number;
  slug: string;
  fournisseur: Fournisseur = new Fournisseur();
  blList : BonLivraison[] =[]
  //BCList : BonsCommande[] =[]
  simpleList : SimpleFournisseur[] =[]
  //avoireList : AvoireFournisseur[] =[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fournisseurService: FournisseurService,
    public navigate : NavigateService
  ) {}


  async  ngOnInit() {

    await this.checkRouteAndGetFournisseur();

    if(this.fournisseur.societe)
    this.navigate.toShowPath('FR',this.fournisseur.societe.id,this.fournisseur.societe.slug)
    this.getAllBonLivraisonForFournisseur()
    this.getAllSimpleForFournisseur()

  }


  getAllSimpleForFournisseur() {

    const idSlug = this.route.snapshot.url[1].path;
    const [id] = idSlug.split('-');
    this.id = parseInt(id, 10);

    this.fournisseurService.getAllSimpleForFournisseur(this.id).subscribe({
      next: (data) => (this.simpleList = data),
      error: (e) => console.log(e),
    });


  }

  getAllBonLivraisonForFournisseur() {

    const idSlug = this.route.snapshot.url[1].path;
    const [id] = idSlug.split('-');
    this.id = parseInt(id, 10);

    this.fournisseurService.getAllBonLivraisonForFournisseur(this.id).subscribe({
      next: (data) => (this.blList = data),
      error: (e) => console.log(e),
    });

  }

  async checkRouteAndGetFournisseur() {

    const idSlug = this.route.snapshot.url[1].path;
    const [id] = idSlug.split('-');
    this.id = parseInt(id, 10);


    if (this.id) {
      this.fournisseurService.getFournisseurById(this.id).subscribe({
        next: (data) => (this.fournisseur = data),
        error: (err) => console.log(err),
        complete: () => {
          this.checkSlug();
        },
      });

    } else {
      this.router.navigateByUrl(this.navigate.f_fournisseurPath);
    }
  }

  checkSlug() {
    if (this.fournisseur.slug != this.slug) {
      this.router.navigateByUrl(this.navigate.toShowPath('FR',this.id,this.fournisseur.slug));
    }
  }





}
