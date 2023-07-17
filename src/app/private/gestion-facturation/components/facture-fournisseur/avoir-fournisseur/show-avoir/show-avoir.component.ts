import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvoireFournisseur } from './../../../../models/avoir-fournisseur';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModeReglement } from 'src/app/private/gestion-facturation/models/mode-reglement';
import { CompteBanc } from 'src/app/private/gestion-facturation/models/compte-banc';
import { ActivatedRoute, Router } from '@angular/router';
import { AvoirFournisseurService } from 'src/app/private/gestion-facturation/http/avoir-fournisseur.service';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CompteBcService } from 'src/app/private/gestion-facturation/http/compteBanc.service';
import { ModeReglementService } from 'src/app/private/gestion-facturation/http/mode-reglement.service';
import { PaiementService } from 'src/app/private/gestion-facturation/http/paiement.service';
import { DetailsService } from 'src/app/shared/services/details.service';
import { AvoireFournisseurStatus } from 'src/app/private/gestion-facturation/enums/avoire-fournisseur-status';
import { switchMap } from 'rxjs/operators';
import { Paiement } from 'src/app/private/gestion-facturation/models/paiement';

@Component({
  selector: 'app-show-avoir',
  templateUrl: './show-avoir.component.html',
  styleUrls: ['./show-avoir.component.scss']
})
export class ShowAvoirComponent {

  @ViewChild('payDetailsPopup') payDetailsPopup: TemplateRef<any>;
  @ViewChild('payEditPopup') payEditPopup: TemplateRef<any>;
  @ViewChild('payDeletePopup') payDeletePopup: TemplateRef<any>;
  @ViewChild('remisePopup') remisePopup: TemplateRef<any>;

  id: number;
  slug: string;
  avoir: AvoireFournisseur =new AvoireFournisseur();
  items :any
  selectedPaiement: any;
  selectedRemise: any;

  payForm: FormGroup<any>;

  showPayPopup = false;
  selectedPayPopup: any; // Reference to the currently selected payment popup template

  modeRegList :ModeReglement[]
  compBancList:CompteBanc[]

  constructor(private route: ActivatedRoute,
    private router: Router,
    private avoirFournisseurService: AvoirFournisseurService,
    protected navigate : NavigateService,
    protected details :DetailsService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private paiementService: PaiementService,
    private toastr: ToastrService,
    private translate : TranslateService,
    private modeRegService :ModeReglementService,
    private compteBcService: CompteBcService,

    ) { }

  ngOnInit(): void {

      this.checkRouteAndGetFacture();
      this.iniatForm();
      this.initModReg();
      this.initCompBcs()

  }
  async checkRouteAndGetFacture() {

    [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split(
      '-'
    );
    this.id = +this.id;
    if (this.id) {
      this.avoirFournisseurService.getAvoirFourById(this.id).subscribe({
        next: (data) => (this.avoir = data),
        error: (err) => console.log(err),
        complete: () => {
          this.checkSlug();
        },
      });
    } else {
      this.router.navigateByUrl(this.navigate.f_avoirFournisseurPath);
    }
  }
  checkSlug() {
    if (this.avoir.slug != this.slug) {
      this.router.navigateByUrl(
        this.navigate.toShowPath('AF',this.id,this.avoir.slug)
      );
    }
  }
  getStatutsColor(statuts :any):string{

    if (statuts ==="CANCELLED")
       return 'text-red';
    else if (statuts === "PARTIAL")
       return 'text-yellow';
    else if (statuts ==="TOBEPAID")
       return'text-blue';
    else if (statuts ==="PAID")
       return 'text-green'

  return 'text-gray-4';

  }

  iniatForm() {
    this.payForm = this.formBuilder.group({
      montant: ['', Validators.required],
      type:"Credit",
      modeReglement :null,
      reference: '',
      note:'',
      dateReglement: null,
      dateRemise: null,
      iSmiseBanc:false,
      compteBanc:null

    });
  }
  initModReg() {
    this.modeRegService.getModeReglementList().subscribe({
      next: (data) => (this.modeRegList= data),
      error: (err) => console.log(err),
      complete: () => {
      },
    });
  }

  initCompBcs(){
    this.compteBcService.getCompteBancList().subscribe({
        next: (data) => (this.compBancList= data),
        error: (err) => console.log(err),
        complete: () => {
        },
      });
    }
    payDetails(payDetailsPopup: any) {
      const modalRef = this.modalService.open(payDetailsPopup, {
        windowClass: 'my-modal',
        backdropClass: 'modal-backdrop'
      });

      modalRef.result
        .then((result) => {
          if (result === 'edit') {
            // Open the edit popup with the prepopulated form values
            this.openPayPopup(this.payEditPopup);
          } else if (result === 'delete') {
            this.openPayPopup(this.payDeletePopup);
          }
        })
        .catch(() => {});

        // Populate the form controls with the selected payment details
        this.payForm.patchValue({
          montant: this.selectedPaiement.montant,
          type: this.selectedPaiement.type,
          modeReglement: this.selectedPaiement.modeReglement,
          reference: this.selectedPaiement.reference,
          note: this.selectedPaiement.note,
          dateReglement: this.selectedPaiement.dateReglement,
          iSmiseBanc: this.selectedPaiement.dateRemise ? true : false, // Set iSmiseBanc based on the existence of dateRemise
          dateRemise: this.selectedPaiement.dateRemise,
          compteBanc: this.selectedPaiement.type === 'Debit' ? this.selectedPaiement.compteDebiteur : this.selectedPaiement.compteCrediteur
        });
    }

   // Method to open the payment popup based on the button clicked
   openPayPopup(popupTemplate: TemplateRef<any>) {
    this.modalService.dismissAll()
    const modalRef = this.modalService.open(popupTemplate, {
      windowClass: 'my-modal',
      backdropClass: 'modal-backdrop'
    });

    modalRef.result.then((result) => {
      if (result === 'edit') {
       this.updatePay()
      }
      else if (result === 'delete') {
       this.deletePay()

      }
    }).catch(() => {});
  }

   // Method to close the payment popup
   closePayPopup() {
    this.showPayPopup = false;
  }

  deletePay() {
    const id = this.selectedPaiement.id;

    if(this.avoir.paiementList.length==1) {
      this.updateAoirFournisseur(AvoireFournisseurStatus.TOBEPAID)
        .pipe(
          switchMap(() => this.paiementService.deletePaiementById(id))
        )
        .subscribe({
          error: e => console.log(e),
          complete: () => {
            this.translate.get('MODAL.INPUT.DP').subscribe((msg) => {
              this.toastr.success(msg);
            });
          location.reload()
          }
        });
    }

    else{
      this.updateAoirFournisseur(AvoireFournisseurStatus.PARTIAL)
        .pipe(
          switchMap(() => this.paiementService.deletePaiementById(id))
        )
        .subscribe({
          error: e => console.log(e),
          complete: () => {
            this.translate.get('MODAL.INPUT.DP').subscribe((msg) => {
              this.toastr.success(msg);
            });
          location.reload()
          }
        });
    }

  }



  updateAoirFournisseur(status: any) {
    this.avoir.status = status;
    return this.avoirFournisseurService.updateAvoirFourById(this.avoir.id, this.avoir);
  }

  updatePay() {
    if (this.payForm.valid) {
      const paiement = new Paiement();
      paiement.id=this.selectedPaiement.id
      paiement.type = this.payForm.get('type')?.value;
      paiement.montant = this.payForm.get('montant')?.value;
      paiement.reference = this.payForm.get('reference')?.value;
      paiement.note = this.payForm.get('note')?.value;
      paiement.dateReglement = this.payForm.get('dateReglement')?.value;
      paiement.modeReglement = this.payForm.get('modeReglement')?.value;
      paiement.avoirFournisseur = this.avoir;

      if (this.payForm.get('iSmiseBanc')?.value) {
        if (paiement.type === 'Debit')
          paiement.compteDebiteur = this.payForm.get('compteBanc')?.value as CompteBanc;
        else
          paiement.compteCrediteur = this.payForm.get('compteBanc')?.value as CompteBanc;

        paiement.dateRemise = this.payForm.get('dateRemise')?.value;
      }

      this.paiementService.updatePaiementById(paiement.id,paiement).subscribe({
        next: () => {
          this.translate.get('MODAL.INPUT.UP').subscribe((msg) => {
            this.toastr.success(msg);
          });
          this.closePayPopup();
          location.reload();
        },
        error: (err) => {
          console.log(err);
          // this.translate.get('error').subscribe((msg) => {
            // this.toastr.error(msg);
          //});
        }
      });
    }
  }


  remiseDetails(remisePopup: any) {
    this.modalService.dismissAll()
    const modalRef = this.modalService.open(remisePopup, {

      windowClass: 'my-modal',
      backdropClass: 'modal-backdrop'
    });
    }

  }


