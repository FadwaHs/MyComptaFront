import { PaiementService } from './../../../../http/paiement.service';
import { Paiement } from './../../../../models/paiement';
import { FournisseurService } from 'src/app/private/gestion-facturation/http/fournisseur.service';
import { SimpleFournisseurService } from './../../../../http/simple-fournisseur.service';
import { Fournisseur } from 'src/app/private/gestion-facturation/models/fournisseur';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { SimpleFournisseur } from 'src/app/private/gestion-facturation/models/simple-fournisseur';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsService } from 'src/app/shared/services/details.service';
import { SimpleFournisseurStatus } from 'src/app/private/gestion-facturation/enums/simple-fournisseur-status';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { switchMap} from 'rxjs/operators';
import { CompteBanc } from 'src/app/private/gestion-facturation/models/compte-banc';
import { ModeReglement } from 'src/app/private/gestion-facturation/models/mode-reglement';
import { ModeReglementService } from 'src/app/private/gestion-facturation/http/mode-reglement.service';
import { CompteBcService } from 'src/app/private/gestion-facturation/http/compteBanc.service';


@Component({
  selector: 'app-show-simple',
  templateUrl: './show-simple.component.html',
  styleUrls: ['./show-simple.component.scss']
})
export class ShowSimpleComponent {


  @ViewChild('payDetailsPopup') payDetailsPopup: TemplateRef<any>;
  @ViewChild('payEditPopup') payEditPopup: TemplateRef<any>;
  @ViewChild('payDeletePopup') payDeletePopup: TemplateRef<any>;
  @ViewChild('remisePopup') remisePopup: TemplateRef<any>;




  id: number;
  slug: string;
  facture: SimpleFournisseur =new SimpleFournisseur();
  items :any
  selectedPaiement: any;
  selectedRemise: any;

  payForm: FormGroup<any>;

  showPayPopup = false; // Flag to control whether to show the payment popup or not
  selectedPayPopup: any; // Reference to the currently selected payment popup template

  modeRegList :ModeReglement[]
  compBancList:CompteBanc[]


  constructor(private route: ActivatedRoute,
    private router: Router,
    private simpleFournisseurService: SimpleFournisseurService,
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
      this.simpleFournisseurService.getSimpleFourById(this.id).subscribe({
        next: (data) => (this.facture = data),
        error: (err) => console.log(err),
        complete: () => {
          this.checkSlug();
        },
      });
    } else {
      this.router.navigateByUrl(this.navigate.f_simpleFournisseurPath);
    }
  }

  checkSlug() {
    if (this.facture.slug != this.slug) {
      this.router.navigateByUrl(
        this.navigate.toShowPath('SF',this.id,this.facture.slug)
      );
    }
  }
 getStatutsColor(statuts :any):string{
  if (statuts ==="LATE")
     return 'text-red';
  else if (statuts ==="CANCELLED")
     return 'text-red';
  else if (statuts === "PARTIAL"||statuts ==="PARTIAL_DELIVERY")
     return 'text-yellow';
  else if (statuts ==="TOBERESOLVED")
     return'text-blue';
  else if (statuts ==="PAID"||statuts === "DELIVERED")
     return 'text-green'

return 'text-gray-4';

}

iniatForm() {
  this.payForm = this.formBuilder.group({
    montant: ['', Validators.required],
    type:"Debit",
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

  if(this.facture.paiementList.length==1) {
    this.updateSimpleFournisseur(SimpleFournisseurStatus.TOBERESOLVED)
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
    this.updateSimpleFournisseur(SimpleFournisseurStatus.PARTIAL)
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



updateSimpleFournisseur(status: any) {
  this.facture.status = status;
  return this.simpleFournisseurService.updateSimpleFourById(this.facture.id, this.facture);
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
    paiement.simpleFournisseur = this.facture;

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


