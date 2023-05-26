import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DevisStatus } from 'src/app/private/gestion-facturation/enums/devis-status';
import { FactureAcompteStatus } from 'src/app/private/gestion-facturation/enums/facture-acompte-status';
import { CompteBcService } from 'src/app/private/gestion-facturation/http/compteBanc.service';
import { DevisService } from 'src/app/private/gestion-facturation/http/devis.service';
import { FactureAcompteService } from 'src/app/private/gestion-facturation/http/facture-acompte.service';
import { CompteBanc } from 'src/app/private/gestion-facturation/models/compte-banc';
import { Devis } from 'src/app/private/gestion-facturation/models/devis';
import { FactureAcompte } from 'src/app/private/gestion-facturation/models/facture-acompte';
import { ArticlePanelComponent } from 'src/app/shared/components/article-panel/article-panel.component';
import { KeyWordFormComponent } from 'src/app/shared/components/key-word-form/key-word-form.component';
import { ReglementFormComponent } from 'src/app/shared/components/reglement-form/reglement-form.component';
import { TextFieldFormComponent } from 'src/app/shared/components/text-field-form/text-field-form.component';
import { NavigateService } from 'src/app/shared/services/navigate.service';

@Component({
  selector: 'app-add-edit-acompte',
  templateUrl: './add-edit-acompte.component.html',
  styleUrls: ['./add-edit-acompte.component.scss']
})


export class AddEditAcompteComponent  implements OnInit {

  @ViewChild(ArticlePanelComponent)
  childArticlePanel: ArticlePanelComponent;

  @ViewChild(ReglementFormComponent)
  childReglementForm: ReglementFormComponent;

  @ViewChild(TextFieldFormComponent)
  childTextField: TextFieldFormComponent;

  @ViewChild(KeyWordFormComponent)
  childKeyWord: KeyWordFormComponent;


  id: number;
  slug: string;
  isAddMode: boolean = true;
  acoumpteForm: FormGroup;
  selectedDevis: Devis;
  items: Devis[];
  items_compte : CompteBanc[];
  montantType =['%','MAD'];
  isProvisional : boolean = true;
  factureAcompte : FactureAcompte = new FactureAcompte();

constructor(

  private router: Router,
  private route: ActivatedRoute,
  protected navigate : NavigateService,
  private formBuilder: FormBuilder,
  private devisService : DevisService,
  private  compteBcService : CompteBcService,
  private factureAcompteService : FactureAcompteService){

}

ngOnInit(): void {

  this.initializeForms();
  // only by signed devis
  this.initdevis();
  this.initcomptebanc();

  if (this.route.snapshot.url[0].path == 'edit') {
    this.isAddMode = false;
    this.verifyRouteAndGetAcompte();
  }

}


initializeForms() {

  this.acoumpteForm = this.formBuilder.group({

   devisSigned : null,
   montant : null,
   montantType: ['', Validators.required],
   tva: [{ value: 20, disabled: false }, Validators.required],
   tvaNotApplicable: [false],
   rib: null
  });

  this.acoumpteForm.controls['tvaNotApplicable'].valueChanges.subscribe((checked: boolean) => {
    const tvaControl = this.acoumpteForm.get('tva');
    if (tvaControl) {
      if (checked) {
        tvaControl.disable();
      } else {
        tvaControl.enable();
      }
    }
  });
}

 async initdevis() {

  const allDevis =  await firstValueFrom(this.devisService.getAllDeviss());
  this.items = allDevis.filter(devis => devis.status === DevisStatus.SIGNED);

}

async initcomptebanc() {
  this.items_compte = await firstValueFrom(this.compteBcService.getCompteBancList());
}


async verifyRouteAndGetAcompte() {

  [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split(
    '-'
  );
  this.id = +this.id;
  if (this.id) {
    this.factureAcompteService.getFactureAcompteById(this.id).subscribe({
      next: (data) => {
        this.factureAcompte = data
      },
      error: (err) => console.log(err),
      complete: () => {
        // for Edit
        if(this.factureAcompte.status !== FactureAcompteStatus.PROVISIONAL) this.isProvisional = false
        this.checkSlug();
        this.setOtherForms();
        if(this.isProvisional) this.setFormValues();
      },
    });
  } else {
    this.router.navigateByUrl(this.navigate.f_acomptePath);
  }
}

  // for Edit
  checkSlug(){
    if (this.factureAcompte.slug === this.slug) {
    } else {
      this.router.navigateByUrl(this.navigate.toEditPath('FA',this.id,this.factureAcompte.slug));
    }
  }

  // for Edit
  setOtherForms(){

      if(this.factureAcompte.motCleList.length) this.childKeyWord.setFormValues(this.factureAcompte.motCleList)
  }




onSubmit() {

  if (this.acoumpteForm.valid && ( this.selectedDevis || !this.isAddMode)) {
    this.getFormValues();
    if (this.isAddMode) {
      this.createNewAcompte();
    } else {
        this.updateAcompte();
    }
  } else {
    console.log('Invalid Form');
   }
}

updateAcompte() {
  if(this.isProvisional)
  this.factureAcompteService.updateFactureAcompteById(this.factureAcompte.id,this.factureAcompte).subscribe({
    next: (data) => (this.factureAcompte = data),
    error: (e) => console.log(e),
    complete: () => {
      this.submitOtherForms();
    },
  });
}


createNewAcompte() {

  this.factureAcompteService.addFactureAcompte(this.factureAcompte).subscribe({
    next: (data) => (this.factureAcompte = data),
    error: (e) => console.log(e),
    complete: () => {
      this.submitOtherForms();
    },
  });
}

// for Add and Edit
async submitOtherForms() {

  var factureAcompte : FactureAcompte = new FactureAcompte()
  factureAcompte.id = this.factureAcompte.id

  await this.childKeyWord.onSubmit(factureAcompte,this.isAddMode);
  this.router.navigateByUrl(this.navigate.f_acomptePath);
}


  // For Add
  getFormValues() {

    this.factureAcompte.devis = this.acoumpteForm.controls['devisSigned'].value as Devis;
    this.factureAcompte.montantPayed = this.acoumpteForm.controls['montant'].value;
    if( this.acoumpteForm.controls['montantType'].value == '%') this.factureAcompte.monIsPercentage = true
    else this.factureAcompte.monIsPercentage = false;
    this.factureAcompte = this.childReglementForm.getReglementForm(this.factureAcompte) as FactureAcompte
    this.factureAcompte = this.childTextField.getTextForm(this.factureAcompte) as FactureAcompte
    this.factureAcompte.compteBanc = this.acoumpteForm.controls['rib'].value as CompteBanc


    // Calcule du Montant(HT) et le Total TTC Du Facture :
    if(this.acoumpteForm.get('tva')?.enable)
    {
      var tva = this.acoumpteForm.controls['tva'].value;
      this.factureAcompte.totalHT = (this.acoumpteForm.controls['devisSigned'].value as Devis).totalHT * (this.factureAcompte.montantPayed /100);
      this.factureAcompte.totalTTC = this.factureAcompte.totalHT * (1+(tva/100));

    }else if (this.acoumpteForm.get('tva')?.disable)
    {
      this.factureAcompte.totalHT = (this.acoumpteForm.controls['devisSigned'].value as Devis).totalHT * (this.factureAcompte.montantPayed /100);
      this.factureAcompte.totalTTC = this.factureAcompte.totalHT
    }

   }


  // for Edit
  setFormValues() {

    this.acoumpteForm.controls['devisSigned'].setValue(this.factureAcompte.devis)
    this.acoumpteForm.controls['montant'].setValue(this.factureAcompte.montantPayed)
    if( this.factureAcompte.monIsPercentage = true ) this.acoumpteForm.controls['montantType'].setValue('%')
    else this.acoumpteForm.controls['montantType'].setValue('MAD')
    this.childTextField.setTextForm(this.factureAcompte)
    this.childReglementForm.setReglementForm(this.factureAcompte)
    this.acoumpteForm.controls['rib'].setValue(this.factureAcompte.compteBanc)
  }



}
