import { Fournisseur } from './../../../private/gestion-facturation/models/fournisseur';
import { FournisseurService } from './../../../private/gestion-facturation/http/fournisseur.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom, forkJoin } from 'rxjs';
import { ClientService } from 'src/app/private/gestion-facturation/http/client.service';
import { SocieteService } from 'src/app/private/gestion-facturation/http/societe.service';
import { Client } from 'src/app/private/gestion-facturation/models/client';
import { Devis } from 'src/app/private/gestion-facturation/models/devis';
import { Facture } from 'src/app/private/gestion-facturation/models/facture';
import { FactureAcompte } from 'src/app/private/gestion-facturation/models/facture-acompte';
import { FactureAvoir } from 'src/app/private/gestion-facturation/models/facture-avoir';
import { FactureSimple } from 'src/app/private/gestion-facturation/models/facture-simple';
import { Societe } from 'src/app/private/gestion-facturation/models/societe';
import { NavigateService } from '../../services/navigate.service';


interface Recipient {

  data : Client | Societe |Fournisseur
  type: 'C'| 'S'|'FR'
}

class Item{
  recipient : Recipient  = {} as Recipient
  name : string
  group : string
  icon: 'par'|'pro'|'plus'
}

@Component({
  selector: 'app-select-recipient',
  templateUrl: './select-recipient.component.html',
  styleUrls: ['./select-recipient.component.scss']
})
export class SelectRecipientComponent implements OnInit {

  @Output()
  selected : EventEmitter<void>  = new EventEmitter()

  @Input()
  for : 'D'|'F'|'A'|'FA'|'O' |'SF'|'AF'|'BC'

  items : Item[] = []
  clients : Client[]
  societes : Societe[]
  fournisseurs :Fournisseur[]
  recipient : Recipient
  constructor(
    private clientService: ClientService,
    private societeService : SocieteService,
    private translate : TranslateService,
    private router : Router,
    private navigate : NavigateService,
    private fournisseurService:FournisseurService
  ) { }

  ngOnInit(): void {
    this.setClientAndSociete();
  }

  // setClientAndSociete() {

  //   forkJoin({
  //     res1 : this.clientService.getClientsByFirstNameAndLastName(),
  //     res2 : this.societeService.getSocieteByName()
  //   })
  //   .subscribe({
  //     next : ({res1,res2}) =>{
  //       this.clients = res1
  //       this.societes = res2
  //     },
  //     error: e => console.log(e),
  //     complete: () => this.setRecipients()
  //   })

  // }
  setClientAndSociete() {
    forkJoin([
      this.clientService.getClientsByFirstNameAndLastName(),
      this.societeService.getSocieteByName(),
      this.fournisseurService.getFournisseursByFirstNameAndLastName()
    ]).subscribe(
      ([clients, societes, fournisseurs]) => {
        this.clients = clients;
        this.societes = societes;
        this.fournisseurs = fournisseurs;
        this.setRecipients();
      },
      error => {
        console.log(error);
      }
    );
  }


  async setRecipients() {
    if (this.for === 'AF' || this.for === 'SF'|| this.for === 'BC')
    {
      var item : Item = new Item()
      item.name = await firstValueFrom(this.translate.get('FORM.SELECT.CNF'))
      item.icon = 'plus'
      this.items = [...this.items,item]

      this.fournisseurs.forEach(f =>{
        item = new Item()
        item.recipient.data = f
        item.recipient.type = 'FR'
        item.icon = 'par'
        item.name = f.firstName + ' ' +f.lastName
        this.translate.get('TITLE.FR').subscribe( res => item.group = res)
        this.items = [...this.items,item]

      })

    }


  else{
      var item : Item = new Item()
      item.name = await firstValueFrom(this.translate.get('FORM.SELECT.NC'))
      item.icon = 'plus'
      this.items = [...this.items,item]

      var item : Item = new Item()
      item.name = await firstValueFrom(this.translate.get('FORM.SELECT.NS'))
      item.icon = 'plus'
      this.items = [...this.items,item]

      this.clients.forEach(client =>{
        item = new Item()
        item.recipient.data = client
        item.recipient.type = 'C'
        item.icon = 'par'
        item.name = client.firstName + ' ' +client.lastName
        this.translate.get('TITLE.C').subscribe( res => item.group = res)
        this.items = [...this.items,item]

      })

      this.societes.forEach(async societe =>{
        item = new Item()
        item.recipient.data = societe
        item.name = societe.name
        item.recipient.type = 'S'
        item.icon = 'pro'
        this.translate.get('TITLE.S').subscribe( res => item.group = res)
        this.items = [...this.items,item]
      })

  }

  }

  async selectChange(event :Item){

    if(event.name == await firstValueFrom(this.translate.get('FORM.SELECT.NC')))
    this.router.navigateByUrl(this.navigate.toAddPath('C'))
    else if(event.name == await firstValueFrom(this.translate.get('FORM.SELECT.NS')))
    this.router.navigateByUrl(this.navigate.toAddPath('S'))
    else  if(event.name == await firstValueFrom(this.translate.get('FORM.SELECT.CNF')))
    this.router.navigateByUrl(this.navigate.toAddPath('FR'))
    else this.selected.emit();
  }

  getRecipient(data : any) : any{
    if(this.for == 'D'|| this.for === 'F' || this.for === 'A' || this.for === 'O'){
      if(this.recipient.type == 'C'){
        data.client = this.recipient.data as Client
        data.societe = null
        data.fournisseur =null
      }
      else if(this.recipient.type == 'S'){
        data.societe = this.recipient.data as Societe
        data.client = null
        data.fournisseur =null
      }
    }

    else if(this.for == 'FA'){
      var factureAcompte : FactureAcompte  = data as FactureAcompte
      // factureAcompte.devis = this.recipient.data
    }
    else  if (this.for === 'AF' || this.for === 'SF'|| this.for === 'BC') {
      if(this.recipient.type == 'FR'){
        data.fournisseur = this.recipient.data as Fournisseur
        data.societe = null
        data.client =null

      }
    }

    return data;
  }

  setRecipient(data : any) {

    if(this.for == 'D' || this.for === 'F' || this.for === 'A' || this.for === 'O'){
      var recipient : Recipient  = {} as Recipient
      if(data.client){
        recipient.data = data.client as Client
        recipient.type = 'C'
        this.recipient = recipient
      }

      else if(data.societe){
        recipient.data = data.societe as Societe
        recipient.type = 'S'
        this.recipient = recipient
      }
    }

    else if(this.for == 'FA'){
      var factureAcompte : FactureAcompte  = data as FactureAcompte
      var recipient : Recipient  = {} as Recipient
      // if(factureAcompte.devis){
      //   recipient.data = factureAcompte.devis as Client
      //   recipient.type = 'D'
      //   this.recipient = recipient
      // }
    }

    else  if (this.for === 'AF' || this.for === 'SF'|| this.for === 'BC') {
      var recipient : Recipient  = {} as Recipient
      if(data.fournisseur){
        recipient.data = data.fournisseur as Fournisseur
        recipient.type = 'FR'
        this.recipient = recipient


      }
    }

  }

  comparewith(item : Item, selected :Recipient) {
    return item?.recipient?.data?.id === selected.data.id && item?.recipient?.type === selected.type
  }

}
