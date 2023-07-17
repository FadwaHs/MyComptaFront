import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvoireFournisseur } from './../../../../models/avoir-fournisseur';
import { Component, ViewChild } from '@angular/core';
import { ArticlePanelComponent } from 'src/app/shared/components/article-panel/article-panel.component';
import { KeyWordFormComponent } from 'src/app/shared/components/key-word-form/key-word-form.component';
import { ReglementFormComponent } from 'src/app/shared/components/reglement-form/reglement-form.component';
import { SelectRecipientComponent } from 'src/app/shared/components/select-recipient/select-recipient.component';
import currencies from 'src/assets/json/currencies.json'
import { AvoirFournisseurService } from 'src/app/private/gestion-facturation/http/avoir-fournisseur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { AvoireFournisseurStatus } from 'src/app/private/gestion-facturation/enums/avoire-fournisseur-status';


@Component({
  selector: 'app-add-edit-avoir',
  templateUrl: './add-edit-avoir.component.html',
  styleUrls: ['./add-edit-avoir.component.scss']
})
export class AddEditAvoirComponent {

@ViewChild(SelectRecipientComponent)
childSelectRecipient: SelectRecipientComponent;

@ViewChild(ArticlePanelComponent)
childArticlePanel: ArticlePanelComponent;

@ViewChild(ReglementFormComponent)
childReglementForm: ReglementFormComponent;

@ViewChild(KeyWordFormComponent)
childKeyWord: KeyWordFormComponent;

id: number;
slug: string;
avoireFournisseur :AvoireFournisseur =new AvoireFournisseur()
avFournForm: FormGroup;
isAddMode: boolean = true;
isSelected : boolean = false
currencies : any[] = currencies
currentCurrency : string
isArticleFormValid : boolean = false
isDraft : boolean = true
isPartial : boolean =true
toBePaid :boolean =true

constructor(
  private formBuilder: FormBuilder,
  private avoirFournisseurService: AvoirFournisseurService,
  private router: Router,
  private route: ActivatedRoute,
  protected navigate : NavigateService
) {}

async ngOnInit(): Promise<void> {
  this.initializeForms();
  if (this.route.snapshot.url[0].path == 'edit') {
    this.isAddMode = false;
    this.verifyRouteAndGetFactureSimple();
  }

}

async verifyRouteAndGetFactureSimple() {
  [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split(
    '-'
  );
  this.id = +this.id;
  if (this.id) {
    this.avoirFournisseurService.getAvoirFourById(this.id).subscribe({
      next: (data) => {
        this.avoireFournisseur = data

      },
      error: (err) => console.log(err),
      complete: () => {
        if(this.avoireFournisseur.status !== AvoireFournisseurStatus.DRAFT) this.isDraft = false
        if(this.avoireFournisseur.status !== AvoireFournisseurStatus.PARTIAL) this.isPartial = false
        if(this.avoireFournisseur.status !== AvoireFournisseurStatus.TOBEPAID) this.toBePaid = false

        this.checkSlug();
        this.setOtherForms();
        if(this.isDraft) this.setFormValues();
        if(this.isPartial) this.setFormValues();
        if(this.toBePaid) this.setFormValues();


      },
    });
  } else {
    this.router.navigateByUrl(this.navigate.f_avoirFournisseurPath);
  }
}

checkSlug(){
  if (this.avoireFournisseur.slug === this.slug) {
  } else {
    this.router.navigateByUrl(this.navigate.toEditPath('AF',this.id,this.avoireFournisseur.slug));
  }
}

initializeForms() {
  this.avFournForm = this.formBuilder.group({
    devise: [this.currencies[0].name_symbol, Validators.required],
    tvaNotApplicable: false,
    numero_externe: '',
    note:null,

  });
}

tvaApplicableChanged(){
  this.childArticlePanel.setTvaNotApplicable(this.avFournForm.controls['tvaNotApplicable'].value)
}

setOtherForms(){
  if(this.isDraft || this.isPartial || this.toBePaid){
    if(this.avoireFournisseur.motCleList.length) this.childKeyWord.setFormValues(this.avoireFournisseur.motCleList)
    this.childArticlePanel.setFormValues(this.avoireFournisseur.articleList)
  }
  else{
    setTimeout(() => {
      if(this.avoireFournisseur.motCleList.length) this.childKeyWord.setFormValues(this.avoireFournisseur.motCleList)
    }, 0);
  }
}

setValidationArticleForm(event : boolean){
  this.isArticleFormValid = event
}

onSubmit() {
  if (this.avFournForm.valid && ( this.isSelected || !this.isAddMode) && this.isArticleFormValid) {
    this.getFormValues();
    if (this.isAddMode) {
      this.createAvoirFournisseur();
    } else {
      this.updateAvoirFournisseur();
    }
  } else {
    console.log('Invalid Form');
  }
}

createAvoirFournisseur() {
  this.avoirFournisseurService.addSAvoirFour(this.avoireFournisseur).subscribe({
    next: (data) => (this.avoireFournisseur = data),
    error: (e) => console.log(e),
    complete: () => {
      this.submitOtherForms();
    },
  });
}

updateAvoirFournisseur() {
  if(this.isDraft || this.isPartial || this.toBePaid)
  this.avoirFournisseurService.updateAvoirFourById(this.avoireFournisseur.id,this.avoireFournisseur).subscribe({
    next: (data) => (this.avoireFournisseur = data),
    error: (e) => console.log(e),
    complete: () => {
      this.submitOtherForms();
    },
  });
}

  getFormValues() {
    this.avoireFournisseur.devise = this.avFournForm.controls['devise'].value;
    this.avoireFournisseur.numero_externe = this.avFournForm.controls['numero_externe'].value;
    this.avoireFournisseur.totalHT = this.childArticlePanel.totals.totalHTF
    this.avoireFournisseur.totalTTC = this.childArticlePanel.totals.total
    this.avoireFournisseur.note = this.avFournForm.controls['note'].value;
    this.avoireFournisseur = this.childArticlePanel.getRemiseForm(this.avoireFournisseur) as AvoireFournisseur
    this.avoireFournisseur = this.childSelectRecipient.getRecipient(this.avoireFournisseur) as AvoireFournisseur
    this.avoireFournisseur = this.childReglementForm.getReglementForm(this.avoireFournisseur) as AvoireFournisseur

 }

 setFormValues() {
  this.avFournForm.controls['devise'].setValue(this.avoireFournisseur.devise)
  this.avFournForm.controls['numero_externe'].setValue(this.avoireFournisseur.numero_externe)
  this.avFournForm.controls['note'].setValue(this.avoireFournisseur.note)
  this.childArticlePanel.setRemiseForm(this.avoireFournisseur)
  this.childSelectRecipient.setRecipient(this.avoireFournisseur)
  this.childReglementForm.setReglementForm(this.avoireFournisseur)
 }

 async submitOtherForms() {
  var avoir : AvoireFournisseur = new AvoireFournisseur()
  avoir.id = this.avoireFournisseur.id
  if(this.isDraft||this.isPartial|| this.toBePaid){
    await this.childKeyWord.onSubmit(avoir,this.isAddMode);
    await this.childArticlePanel.onSubmit(avoir,this.isAddMode)
  }
  else{
    await this.childKeyWord.onSubmit(avoir,this.isAddMode);
  }
  this.router.navigateByUrl(this.navigate.f_avoirFournisseurPath);
 }

 currencyChanged(event : any){
  this.childArticlePanel.changeReductionType(event.symbol);
}

}
