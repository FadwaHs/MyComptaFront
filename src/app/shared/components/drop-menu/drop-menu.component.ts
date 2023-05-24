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
import { Fournisseur } from 'src/app/private/gestion-facturation/models/fournisseur';

@Component({
  selector: 'app-drop-menu',
  templateUrl: './drop-menu.component.html',
  styleUrls: ['./drop-menu.component.scss']
})
export class DropMenuComponent implements OnInit {

  @Output()
  refreshListPage : EventEmitter<void> = new EventEmitter();

  @Input()
  data: Societe | Client | Devis | Facture | Fournisseur;

  @Input()
  type :'list'|'edit'|'show'|'filter'

  @Input()
  size : 'sm'|'xs'

  @Input()
  for: 'C'|'S'|'D'|'F'|'A'|'FA' | 'FR'

  dropMenu :boolean = false;
  DevisStatus = DevisStatus;
  statusActive: DevisStatus | null = null;

  constructor(
    private alertify : AlertifyService,
    private filterService : FilterService,
    private devisService : DevisService
  ){
  }

  ngOnInit(): void {
  }

  changeFilterStatus(status : DevisStatus | null){
    this.dropMenu = false
    this.statusActive = status
    this.filterService.callMethodFilterStatus(status);
  }


  toggleDropMenu(){
    this.dropMenu = !this.dropMenu
  }
  closeMenu(){
    this.dropMenu = false
  }


  delete(){
    // this.alertify.deleteData(this.data, this.for);
  }

  finalizeIt(){
    if(this.for == 'D') this.updateDevis(DevisStatus.FINALIZED)
  }

  signeIt(){
    if(this.for == 'D') this.updateDevis(DevisStatus.SIGNED)
  }

  refuseIt(){
    if(this.for == 'D') this.updateDevis(DevisStatus.REFUSED)
  }


  updateDevis(devisStatus : DevisStatus){
    (this.data as Devis).status = devisStatus
    this.devisService.updateDevisById(this.data.id, this.data as Devis).subscribe({
      // next : res => this.data = res,
      error : e => console.log(e),
      complete: () => this.refreshListPage.emit()
    })
  }



}
