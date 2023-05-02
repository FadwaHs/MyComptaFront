import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DevisStatus } from 'src/app/private/gestion-facturation/enums/devis-status';
import { AlertifyService } from '../../services/alertify.service';
import { FilterService } from '../../services/filter.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DevisService } from 'src/app/private/gestion-facturation/http/devis.service';
import { Client } from 'src/app/private/gestion-facturation/models/client';
import { Devis } from 'src/app/private/gestion-facturation/models/devis';
import { Facture } from 'src/app/private/gestion-facturation/models/facture';
import { Societe } from 'src/app/private/gestion-facturation/models/societe';
import { FactureSimpleStatus } from 'src/app/private/gestion-facturation/enums/facture-simple-status';
import { FactureSimple } from 'src/app/private/gestion-facturation/models/facture-simple';
import { FactureSimpleService } from 'src/app/private/gestion-facturation/http/facture-simple.service';
import { ClientService } from 'src/app/private/gestion-facturation/http/client.service';
import { SocieteService } from 'src/app/private/gestion-facturation/http/societe.service';

@Component({
  selector: 'app-drop-menu',
  templateUrl: './drop-menu.component.html',
  styleUrls: ['./drop-menu.component.scss']
})
export class DropMenuComponent implements OnInit {

  @Output()
  refreshListPage : EventEmitter<void> = new EventEmitter();

  @Input()
  data: Societe | Client | Devis | Facture | FactureSimple;

  @Input()
  type :'list'|'edit'|'show'|'filter'

  @Input()
  size : 'sm'|'xs'

  @Input()
  for: 'C'|'S'|'D'|'F'|'A'|'FA'

  dropMenu :boolean = false;
  DevisStatus = DevisStatus;
  //Facture:
  FactureSimpleStatus = FactureSimpleStatus;

  statusActive: DevisStatus | null = null;
  statusActiveFacture : FactureSimpleStatus | null = null;


  dates: string[] = ["Trier Par : Date De Création " , "Trier Par : Date De Finalisation ","Trier Par : Date De Paiement "]
  selectedDate = this.dates[0];

  constructor(
    private router: Router,
    private alertify : AlertifyService,
    private filterService : FilterService,
    //DevisService:
    private devisService : DevisService,
    //Facture Service:
    private factureSimpleService : FactureSimpleService,
    // Client Service :
    private clientService : ClientService,
    // SocieteService:
    private societeService : SocieteService,


  ){
  }

  ngOnInit(): void {
  }

  // Devis status
  changeFilterStatus(status : DevisStatus | null ){

    this.dropMenu = false
    this.statusActive = status
    this.filterService.callMethodFilterStatus(status);
  }

  // facture simple
  changeFilterStatusFacture(status:  FactureSimpleStatus | null ){
    this.dropMenu = false
    this.statusActiveFacture = status
    this.filterService.callMethodFilterStatus(status);
  }


  toggleDropMenu(){
    this.dropMenu = !this.dropMenu
  }
  closeMenu(){
    this.dropMenu = false
  }


  delete(id :number){
    if(this.for == 'C') this.deleteClient(id)
    if(this.for == 'S') this.deleteSociete(id)
    if(this.for == 'D') this.deleteDevisprovisoire(id)


  }



  finalizeIt(){
    if(this.for == 'D') this.updateDevis(DevisStatus.FINALIZED)
    if(this.for == 'F') this.updateFacture(FactureSimpleStatus.FINALIZED)
  }

  signeIt(){
    if(this.for == 'D') this.updateDevis(DevisStatus.SIGNED)
  }

  refuseIt(){
    if(this.for == 'D') this.updateDevis(DevisStatus.REFUSED)
  }

  PayIt() {

    if(this.for == 'F') this.updateFacture(FactureSimpleStatus.PAYED)
  }


  updateFacture(FactureSimpleStatus : FactureSimpleStatus){
    (this.data as FactureSimple).status = FactureSimpleStatus
    this.factureSimpleService.updateFactureSimpleById(this.data.id, this.data as FactureSimple).subscribe({
      // next : res => this.data = res,
      error : e => console.log(e),
      complete: () => this.refreshListPage.emit()
    })
  }

  updateDevis(devisStatus : DevisStatus){
    (this.data as Devis).status = devisStatus
    this.devisService.updateDevisById(this.data.id, this.data as Devis).subscribe({
      // next : res => this.data = res,
      error : e => console.log(e),
      complete: () => this.refreshListPage.emit()
    })
  }


  ////// Delete /////

  deleteClient(id: number) {

    this.clientService.deleteClientById(id).subscribe({
      error: e => console.log(e),
      complete: () => {
        // reload the current route
        location.reload();
      }
    });
  }

  deleteSociete(id: number) {
   this.societeService.deleteSocieteById(id).subscribe({
    error: e => console.log(e),
      complete: () => {
        // reload the current route
        location.reload();
      }

   })

  }

  deleteDevisprovisoire(id: number) {
    this.devisService.deleteDevisById(id).subscribe({
      error: e => console.log(e),
        complete: () => {
          // reload the current route
          location.reload();
        }

     })

  }


}
