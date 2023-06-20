import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
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
import { Opportunite } from 'src/app/private/gestion-facturation/models/opportunite';
import { OppStatus } from 'src/app/private/gestion-facturation/enums/OppStatus';
import { OpportuniteService } from 'src/app/private/gestion-facturation/http/opportunite.service';
import { NavigateService } from '../../services/navigate.service';
import { FactureAvoirService } from 'src/app/private/gestion-facturation/http/facture-avoir.service';
import { FactureAvoirStatus } from 'src/app/private/gestion-facturation/enums/facture-avoir-status';
import { FactureAvoir } from 'src/app/private/gestion-facturation/models/facture-avoir';
import { FactureAcompteStatus } from 'src/app/private/gestion-facturation/enums/facture-acompte-status';
import { FactureAcompteService } from 'src/app/private/gestion-facturation/http/facture-acompte.service';
import { FactureAcompte } from 'src/app/private/gestion-facturation/models/facture-acompte';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pipeline } from 'src/app/private/gestion-facturation/models/pipeline';
import { Fournisseur } from 'src/app/private/gestion-facturation/models/fournisseur';
import { FournisseurService } from 'src/app/private/gestion-facturation/http/fournisseur.service';
import { BonLivraison } from 'src/app/private/gestion-facturation/models/bons-livraison';
import { BLStatus } from 'src/app/private/gestion-facturation/enums/BLStatus';
import { BonLivraisonService } from 'src/app/private/gestion-facturation/http/bonLivraison.service';

@Component({
  selector: 'app-drop-menu',
  templateUrl: './drop-menu.component.html',
  styleUrls: ['./drop-menu.component.scss']
})
export class DropMenuComponent implements OnInit {



  @Output()
  refreshListPage : EventEmitter<void> = new EventEmitter();

  @Input()
  //++FactureAcompte added
  data: Societe | Client | Devis | Facture | FactureSimple|Opportunite | FactureAvoir |FactureAcompte| Pipeline |Fournisseur | BonLivraison;


  @Input()
  type :'list'|'edit'|'show'|'filter'

  @Input()
  size : 'sm'|'xs'

  @Input()

  for: 'C'|'S'|'D'|'F'|'A'|'FA'|'O'|'FG'|'P'|'FR'|'BL'


  dropMenu :boolean = false;

  DevisStatus = DevisStatus;
  //Factures:
  FactureSimpleStatus = FactureSimpleStatus;
  FactureAvoirStatus = FactureAvoirStatus;
  FactureAcompteStatus = FactureAcompteStatus;
  // Opportunite:
  OppStatus = OppStatus;
  // bon livraison:
  blstatus = BLStatus;

  statusActive: DevisStatus | null = null;
  statusActiveFacture : FactureSimpleStatus | null = null;
  statusActiveAvoire : FactureAvoirStatus | null = null;
  statusActiveAcompte : FactureAcompteStatus | null = null;
  statusActiveOpp : OppStatus | null=null;
  statusActiveBL : BLStatus | null=null;

  // date tri for facture type : simple and acompte
  dates: string[] = ["Trier Par : Date De Finalisation","Trier Par : Date De Création","Trier Par : Date De Paiement"]
  selectedDate = this.dates[0];
  // date tri for avoir
  dates_avoir: string[] = ["Trier Par : Date De Finalisation","Trier Par : Date De Création","Trier Par : Date De remboursement"]
  dates_devis : string[] = ["Trier Par : Date De Finalisation","Trier Par : Date De Création","Trier Par : Date de signature"]

  selectedDateAvoir = this.dates[0];
  dateRem : Date;
  datePay: Date;
  datePay_acompte : Date;
  //++
  dateSign: Date


  @ViewChild('refundPopup') refundPopup: TemplateRef<any>;
  @ViewChild('payPopup') payPopup: TemplateRef<any>;
   //++
  @ViewChild('signPopup') signPopup: TemplateRef<any>;
  @ViewChild('bonpopup') bonpopup: TemplateRef<any>;



  constructor(

    private router: Router,
    private alertify : AlertifyService,
    private filterService : FilterService,
    public navigate: NavigateService,
    //DevisService:
    private devisService : DevisService,
    //Facture Service:
    private factureSimpleService : FactureSimpleService,
    //Facture Avoire Service
    private factureAvoirService : FactureAvoirService,
    //Facture Acompte Service
    private factureAcompteService : FactureAcompteService,
    // Client Service :
    private clientService : ClientService,
    // SocieteService:
    private societeService : SocieteService,
    // opportuniteService:
    private opportuniteService : OpportuniteService,
    private fournisseurService : FournisseurService,
    // private dialog: MatDialog,
    private modalService: NgbModal,
    // bon livraison :
    private bonlivraisonService : BonLivraisonService

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

 // opp status
 changeFilterOpportunite(status: OppStatus | null): void {

  this.dropMenu = false;
  this.statusActiveOpp = status;
  //  is a shared service between the DropMenuComponent and OpportuniteComponent
  // This method then emits an event to notify the OpportuniteComponent to refresh its list of opportunities based on the selected filter status.
  // this.filterService.setOppStatusFilter(status);
  // this.refreshListPage.emit();
  this.filterService.callMethodFilterStatus(status);
}

  // facture simple status
  changeFilterStatusFacture(status:  FactureSimpleStatus | null ){
    this.dropMenu = false
    this.statusActiveFacture = status
    this.filterService.callMethodFilterStatus(status);
  }

 //facture Avoire status
 changeFilterStatusAvoire(status:  FactureAvoirStatus | null ){
  this.dropMenu = false
  this.statusActiveAvoire = status
  this.filterService.callMethodFilterStatus(status);

 }
  //facture Acomte status
 changeFilterStatusAcomte(status:  FactureAcompteStatus | null ){
    this.dropMenu = false
    this.statusActiveAcompte = status
    this.filterService.callMethodFilterStatus(status);

   }


   // bon livraison status
   changeFilterbonlivraison( status : BLStatus|null)
   {
    this.dropMenu = false;
    this.statusActiveBL = status;
    this.filterService.callMethodFilterStatus(status);

   }


  // sort by date
  sortData(date: string | null) : void{

    this.filterService.setselectedItemSubject(date);
    this.refreshListPage.emit();
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
    if(this.for == 'O') this.deleteOppotunite(id)
    if(this.for == 'A') this.deleteAvoire(id)
    if(this.for == 'FA') this.deleteAcompte(id)
    //++
    if(this.for == 'F') this.deleteSimple(id)
    if(this.for == 'FR') this.deleteFournisseur(id)
    if(this.for == 'BL') this.deleteBonlivraison(id)

  }


  finalizeIt(){
    if(this.for == 'D') this.updateDevis(DevisStatus.FINALIZED)
    if(this.for == 'F') this.updateFacture(FactureSimpleStatus.FINALIZED)
    if(this.for == 'A') this.updateFactureAvoir(FactureAvoirStatus.FINALIZED)
    if(this.for == 'FA') this.updateFactureAcompte(FactureAcompteStatus.FINALIZED)
  }



  signeIt(signPopup :any){
    if(this.for == 'D')
    //++
    {
      const modalRef = this.modalService.open(signPopup, {windowClass: 'my-modal',
      backdropClass: 'modal-backdrop'});
      this.closeMenu()
      modalRef.result
        .then((result) => {
          if (result === 'sign') {
            (this.data as Devis).status = DevisStatus.SIGNED;
            this.updateDevis(DevisStatus.SIGNED)
          }
        })
        .catch(() => {});
    }
   }
  //++
  singdCard(data: Devis, modal: any) {
    if (this.dateSign) {
      (this.data as Devis).date_signature = this.dateSign;
      modal.close('sign');
    }
  }

  refuseIt(){
    if(this.for == 'D') this.updateDevis(DevisStatus.REFUSED)
  }

  //++
  unsigneIt() {
    if(this.for == 'D') {
      // (this.data as Devis).date_signature= null;
      // this.updateDevis(DevisStatus.FINALIZED);
    }
  }


  Perdue() {

    if(this.for == 'O') this.updateOpportunite(OppStatus.LOST)

   }

   Annulee() {
     if(this.for == 'O') this.updateOpportunite(OppStatus.CANCLED)
   }

  toPayIt() {
    var date = new Date()
    if(this.for == 'F') this.updateFacture(FactureSimpleStatus.TOPAYED)

  }

  PayIt(payPopup :any) {

    if(this.for == 'F') {
    const modalRef = this.modalService.open(payPopup, {windowClass: 'my-modal',
    backdropClass: 'modal-backdrop'});
    this.closeMenu()
    modalRef.result
      .then((result) => {
        if (result === 'refund') {
          (this.data as FactureSimple).status = FactureSimpleStatus.PAYED;
          this.updateFacture(FactureSimpleStatus.PAYED);
        }
      })
      .catch(() => {});
    }

    if(this.for == 'FA')
    {
      const modalRef = this.modalService.open(payPopup, {windowClass: 'my-modal',
      backdropClass: 'modal-backdrop'});
      this.closeMenu()
      modalRef.result
        .then((result) => {
          if (result === 'refund') {
            (this.data as FactureAcompte).status = FactureAcompteStatus.PAYED;
            this.updateFactureAcompte(FactureAcompteStatus.PAYED);
          }
        })
        .catch(() => {});
      }


  }

  refundIt(refundPopup :any) {

    const modalRef = this.modalService.open(refundPopup, {windowClass: 'my-modal',
    backdropClass: 'modal-backdrop'});
    this.closeMenu()
    modalRef.result
      .then((result) => {
        if (result === 'refund') {
          (this.data as FactureAvoir).status = FactureAvoirStatus.REFUNDED;
          this.updateFactureAvoir(FactureAvoirStatus.REFUNDED);
        }
      })
      .catch(() => {});
}



  refundCard(data: FactureAvoir, modal: any) {
    if (this.dateRem) {
      (this.data as FactureAvoir).date_remboursement = this.dateRem;
      modal.close('refund');
    }
  }

  payCard(data:FactureSimple | FactureAcompte ,modal: any) {
    if (this.datePay) {
      (this.data as FactureSimple).date_paiement = this.datePay;
      (this.data as FactureAcompte).date_paiement = this.datePay;

      modal.close('refund');
    }
  }



  updateFactureAvoir(factureAvoirStatus: FactureAvoirStatus) {

    (this.data as FactureAvoir).status = factureAvoirStatus
    if(factureAvoirStatus == FactureAvoirStatus.FINALIZED)
        (this.data as FactureAvoir).date_finalisation=  new Date()

    else if (factureAvoirStatus == FactureAvoirStatus.REFUNDED)
        (this.data as FactureAvoir).date_remboursement= this.dateRem

    this.factureAvoirService.updateFactureAvoirById(this.data.id, this.data as FactureAvoir).subscribe({
      error : e => console.log(e),
      complete: () => this.refreshListPage.emit()
    })

  }

  updateFacture(factureSimpleStatus : FactureSimpleStatus){

    (this.data as FactureSimple).status = factureSimpleStatus;
    if(factureSimpleStatus == FactureSimpleStatus.FINALIZED )
         (this.data as FactureSimple).date_finalisation= new Date(); // add date de finalisation

    else if (factureSimpleStatus == FactureSimpleStatus.PAYED)
         (this.data as FactureSimple).date_paiement= this.datePay


    this.factureSimpleService.updateFactureSimpleById(this.data.id, this.data as FactureSimple).subscribe({
      // next : res => this.data = res,
      error : e => console.log(e),
      complete: () => this.refreshListPage.emit()
      // complete: () => location.reload()
    })
  }

  updateFactureAcompte(factureAcompteStatus: FactureAcompteStatus) {

    (this.data as FactureAcompte).status = factureAcompteStatus
    if(factureAcompteStatus == FactureAcompteStatus.FINALIZED)
        (this.data as FactureAcompte).date_finalisation=  new Date()

    else if (factureAcompteStatus == FactureAcompteStatus.PAYED)
        (this.data as FactureAcompte).date_paiement=  this.datePay


    this.factureAcompteService.updateFactureAcompteById(this.data.id, this.data as FactureAcompte).subscribe({
      error : e => console.log(e),
      complete: () => this.refreshListPage.emit()
    })

  }


  updateDevis(devisStatus : DevisStatus){
     //++
     (this.data as Devis).status = devisStatus
     if(devisStatus == DevisStatus.FINALIZED)
         (this.data as Devis).date_finalisation=  new Date()

     else if (devisStatus == DevisStatus.SIGNED)
         (this.data as Devis).date_signature= this.dateSign

     this.devisService.updateDevisById(this.data.id, this.data as Devis).subscribe({
       // next : res => this.data = res,
       error : e => console.log(e),
       complete: () => this.refreshListPage.emit()
     })
  }

  updateOpportunite(oppStatus: OppStatus) {
    (this.data as Opportunite).oppStatus = oppStatus
    this.opportuniteService.updateOpportuniteById(this.data.id,this.data as Opportunite).subscribe(
      {
        error : e => console.log(e),
        complete: () => location.reload()
      }
    )

  }

    /// for changing statut of bon livraison

    Partfacturer()
    {
       // update statut of bon livraison
      (this.data as BonLivraison).blStatus = this.blstatus.Partially_Invoiced
        this.bonlivraisonService.updateBonLivraisonById(this.data.id,this.data as BonLivraison).subscribe(
        {
          error : e => console.log(e),
          complete: () => this.refreshListPage.emit()
        }
      )
    }

    facturer(bonpopup : any)
    {
     // Open the popup using the NgbModal service
      const modalRef = this.modalService.open(bonpopup, { windowClass: 'my-modal', backdropClass: 'modal-backdrop' });

      // Handle the popup result
      modalRef.result.then((result: string) => {
      if (result === 'createInvoice') {
        // this.createSupplierInvoice();
      } else if (result === 'updateStatus') {
        this.updateFacturationStatus(bonpopup);
      }
     });
    }

    updateFacturationStatus(modal : any)
    {
       // update statut of bon livraison
       (this.data as BonLivraison).blStatus = this.blstatus.Invoiced
       this.bonlivraisonService.updateBonLivraisonById(this.data.id,this.data as BonLivraison).subscribe(
       {
         error : e => console.log(e),
         complete: () => this.refreshListPage.emit()
       }
     )
     modal.close('updateStatus')
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
      complete: () => this.refreshListPage.emit()
     })

  }

  deleteOppotunite(id: number) {

    this.opportuniteService.deleteOpportuniteById(id).subscribe({
      error: e => console.log(e),
      complete: () => this.refreshListPage.emit()
     })
  }

  deleteAvoire(id: number) {

      this.factureAvoirService.deleteFactureAvoirById(id).subscribe({
        error: e => console.log(e),
        complete: () => this.refreshListPage.emit()
       })
  }

  deleteAcompte(id:number)
  {

       this.factureAcompteService.deleteFactureAcompteById(id).subscribe({
        error:e => console.log(e),
        complete: () => this.refreshListPage.emit()
       })
  }
//++
  deleteSimple(id:number)
  {

       this.factureSimpleService.deleteFactureSimpleById(id).subscribe({
        error:e => console.log(e),
        complete: () => this.refreshListPage.emit()
       })
  }


  deleteFournisseur(id:number)
  {
    this.fournisseurService.deleteFournisseur(id).subscribe({
      error:e => console.log(e),
      complete: () => {
        location.reload();
      }

     })

  }

  deleteBonlivraison(id:number)
  {
    this.bonlivraisonService.deleteBonLivraisonById(id).subscribe({
      error:e => console.log(e),
      complete: () => this.refreshListPage.emit()
     })
  }




}
