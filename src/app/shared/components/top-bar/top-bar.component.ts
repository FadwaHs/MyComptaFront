import { Component, Input, OnInit } from '@angular/core';
import { DevisStatus } from 'src/app/private/gestion-facturation/enums/devis-status';
import { Client } from 'src/app/private/gestion-facturation/models/client';
import { Devis } from 'src/app/private/gestion-facturation/models/devis';
import { Facture } from 'src/app/private/gestion-facturation/models/facture';
import { Societe } from 'src/app/private/gestion-facturation/models/societe';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { FilterService } from '../../services/filter.service';
import { Fournisseur } from 'src/app/private/gestion-facturation/models/fournisseur';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  dropMenuAdd : boolean = false

  @Input()
  data: Societe | Client | Devis | Facture | Fournisseur ; // added Fournisseur here

  @Input()
  for: 'C'|'S'|'D'|'F'|'A'|'FA' | 'FR'

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
  ) { }

  ngOnInit(): void {

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
      else if(this.for == 'FR'){
        var fournisseur :Fournisseur = this.data as Fournisseur;
        this.showData[0] = fournisseur.firstName+ ' ' + fournisseur.lastName
        if(fournisseur.societe) this.showData[1] = "Professionel"
        else this.showData[1] = "Particulier"
      } //added fournisseur else if here as well
    }

  }

  toggleDropMenuAdd(){
    this.dropMenuAdd = !this.dropMenuAdd

  }

  closeMenuAdd(){
    this.dropMenuAdd = false
  }


}
