import { Opportunite } from './../../../private/gestion-facturation/models/opportunite';
import { Component, Input, OnInit } from '@angular/core';
import { DevisStatus } from 'src/app/private/gestion-facturation/enums/devis-status';
import { Client } from 'src/app/private/gestion-facturation/models/client';
import { Devis } from 'src/app/private/gestion-facturation/models/devis';
import { Facture } from 'src/app/private/gestion-facturation/models/facture';
import { Societe } from 'src/app/private/gestion-facturation/models/societe';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { FilterService } from '../../services/filter.service';
import { Router } from '@angular/router';
import { Pipeline } from 'src/app/private/gestion-facturation/models/pipeline';
import { FactureAcompte } from 'src/app/private/gestion-facturation/models/facture-acompte';
import { FactureAvoir } from 'src/app/private/gestion-facturation/models/facture-avoir';
import { FactureSimple } from 'src/app/private/gestion-facturation/models/facture-simple';
import { Fournisseur } from 'src/app/private/gestion-facturation/models/fournisseur';
import { FactureFournisseur } from 'src/app/private/gestion-facturation/models/facture-fournisseur';
import { SimpleFournisseur } from 'src/app/private/gestion-facturation/models/simple-fournisseur';
import { BonLivraison } from 'src/app/private/gestion-facturation/models/bons-livraison';



interface TopTitle{
  name: string
  link :string
  isActive :boolean;

 }


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})


export class TopBarComponent implements OnInit {
  dropMenuAdd : boolean = false

  items : TopTitle[]


  @Input()
  data: Societe | Client | Devis | Facture | Opportunite | Pipeline | Fournisseur|FactureFournisseur| BonLivraison;

  @Input()
  for: 'C'|'S'|'D'|'F'|'A'|'FA'|'O'|'FG' |'P' |'FR'|'FF'|'SF'|'AF'|'BL'


  @Input()
  type : 'add'|'edit'|'show'|'list'

  @Input()
  sizeMenu : 'sm'|'xs'

  showData :[string, string?] = ['']
  DevisStatus = DevisStatus;
  statusActive: DevisStatus | null = null;

  constructor(
    protected navigate : NavigateService,
    private filterService : FilterService,
    private route :Router
  ) { }

  ngOnInit(): void {

    this.checkTopTitle()

  }


  checkTopTitle() {

  }

  changeFilterStatus(status : DevisStatus | null){
    this.statusActive = status
    this.filterService.callMethodFilterStatus(status);
  }

  ngOnChanges(){
    if(this.type == 'show'){
      if( this.for == 'C' ){
        var client :Client = this.data as Client;
        this.showData[0] = client.firstName+' '+client.lastName
        if(client.societe) this.showData[1] = "Professionel"
        else this.showData[1] = "Particulier"
      }
      else if(this.for == 'S'){
        var societe : Societe = this.data as Societe
        this.showData[0] = societe.name
      }

      else if(this.for == 'D'){
        var devis : Devis = this.data as Devis
        this.showData[0] = "Devis"
        this.showData[1] = devis.code

      }
      else if(this.for == 'F'){
        var facture : Facture = this.data as FactureSimple
        this.showData[0] = "Facture simple"
        this.showData[1] = facture.code
      }
      //++
      else if(this.for == 'A'){
        var facture : Facture = this.data as FactureAvoir
        this.showData[0] = "Avoir"
        this.showData[1] = facture.code
      }
      else if(this.for == 'FA'){
        var facture : Facture = this.data as FactureAcompte
        this.showData[0] = "Facture acompte"
        this.showData[1] = facture.code
      }
      //++
      else if(this.for == 'O'){
        var opportunite : Opportunite = this.data as Opportunite
        this.showData[0] = "Opportunite"
        this.showData[1] = opportunite.code
      }
      else if( this.for == 'FR' ){

        var fournisseur :Fournisseur = this.data as Fournisseur;
        this.showData[0] = fournisseur.firstName+' '+fournisseur.lastName
        if(fournisseur.societe) this.showData[1] = "Professionel"
        else this.showData[1] = "Particulier"
      }

      else if(this.for == 'SF'){
        var factureFournisseur : SimpleFournisseur = this.data as SimpleFournisseur
        this.showData[0] = "Facture fournisseur simple"
        this.showData[1] = factureFournisseur.numero_interne
      }
      else if( this.for == 'BL' ){

        var bonlivraison :BonLivraison = this.data as BonLivraison;
        this.showData[0] = "Bon Livraison "
        this.showData[1] = bonlivraison.numero_interne

      }

    }

  }

  toggleDropMenuAdd(){
    this.dropMenuAdd = !this.dropMenuAdd

  }

  closeMenuAdd(){
    this.dropMenuAdd = false
  }


}
