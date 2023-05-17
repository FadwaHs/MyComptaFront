import { Component, Input, OnInit } from '@angular/core';
import { DevisStatus } from 'src/app/private/gestion-facturation/enums/devis-status';
import { Client } from 'src/app/private/gestion-facturation/models/client';
import { Devis } from 'src/app/private/gestion-facturation/models/devis';
import { Facture } from 'src/app/private/gestion-facturation/models/facture';
import { Societe } from 'src/app/private/gestion-facturation/models/societe';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { FilterService } from '../../services/filter.service';
import { Opportunite } from 'src/app/private/gestion-facturation/models/opportunite';
import { Router } from '@angular/router';


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
  data: Societe | Client | Devis | Facture | Opportunite;

  @Input()
  for: 'C'|'S'|'D'|'F'|'A'|'FA'|'O'|'FG'

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
        var facture : Facture = this.data as Facture
        this.showData[0] = facture.code
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
