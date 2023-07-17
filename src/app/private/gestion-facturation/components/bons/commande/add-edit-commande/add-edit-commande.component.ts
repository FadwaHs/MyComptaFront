import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BCStatus } from 'src/app/private/gestion-facturation/enums/BCStatus';
import { BonCommandeService } from 'src/app/private/gestion-facturation/http/bonCommande.service';
import { BonsCommande } from 'src/app/private/gestion-facturation/models/bons-commande';
import { Livraison } from 'src/app/private/gestion-facturation/models/livraison';
import { AddressFormComponent } from 'src/app/shared/components/address-form/address-form.component';
import { ArticlePanelComponent } from 'src/app/shared/components/article-panel/article-panel.component';
import { KeyWordFormComponent } from 'src/app/shared/components/key-word-form/key-word-form.component';
import { ReglementFormComponent } from 'src/app/shared/components/reglement-form/reglement-form.component';
import { SelectRecipientComponent } from 'src/app/shared/components/select-recipient/select-recipient.component';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import currencies from 'src/assets/json/currencies.json'


@Component({
  selector: 'app-add-edit-commande',
  templateUrl: './add-edit-commande.component.html',
  styleUrls: ['./add-edit-commande.component.scss']
})
export class AddEditCommandeComponent {

@ViewChild(SelectRecipientComponent)
childSelectRecipient: SelectRecipientComponent;

@ViewChild(ArticlePanelComponent)
childArticlePanel: ArticlePanelComponent;

@ViewChild(ReglementFormComponent)
childReglementForm: ReglementFormComponent;

@ViewChild(KeyWordFormComponent)
childKeyWord: KeyWordFormComponent;

//adresse de livraison
@ViewChild(AddressFormComponent)
childAddress: AddressFormComponent;

id: number;
slug: string;
bonCommande :BonsCommande =new BonsCommande();
bonCForm: FormGroup;
isAddMode: boolean = true;
isSelected : boolean = false
currencies : any[] = currencies
currentCurrency : string
isArticleFormValid : boolean = false
isDraft : boolean = true
isRead : boolean =true
isSent :boolean =true
isExpired :boolean =true


constructor(
  private formBuilder: FormBuilder,
  private bonCommandeService: BonCommandeService,
  private router: Router,
  private route: ActivatedRoute,
  protected navigate : NavigateService
) {
  this.bonCommande.livraison= new Livraison()

}

async ngOnInit(): Promise<void> {
  this.initializeForms();
  if (this.route.snapshot.url[0].path == 'edit') {
    this.isAddMode = false;
    this.verifyRouteAndGetBonCommande();
  }
}

async verifyRouteAndGetBonCommande() {
  [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split(
    '-'
  );
  this.id = +this.id;
  if (this.id) {
    this.bonCommandeService.getBonCommandeById(this.id).subscribe({
      next: (data) => {
        this.bonCommande = data

      },
      error: (err) => console.log(err),
      complete: () => {
        if(this.bonCommande.bcStatus !== BCStatus.Draft) this.isDraft = false
        if(this.bonCommande.bcStatus !== BCStatus.Read) this.isRead = false
        if(this.bonCommande.bcStatus !== BCStatus.Sent) this.isSent = false
        if(this.bonCommande.bcStatus !== BCStatus.Expired) this.isExpired = false


        this.checkSlug();
        this.setOtherForms();
        if(this.isDraft ||this.isRead||this.isSent||this.isExpired)
         this.setFormValues();


      },
    });
  } else {
    this.router.navigateByUrl(this.navigate.f_commandePath);
  }
}

checkSlug(){
  if (this.bonCommande.slug === this.slug) {
  } else {
    this.router.navigateByUrl(this.navigate.toEditPath('BC',this.id,this.bonCommande.slug));
  }
}
initializeForms() {
  this.bonCForm = this.formBuilder.group({
    devise: [this.currencies[0].name_symbol, Validators.required],
    tvaNotApplicable: false,
    numero_externe: '',
    note:null,
    livParam :false,
    nombreColis:'',
    poidsTotal : '',
    volume :'',
    numeroSuivi :'',
    urlSuivi:'',
    date_Livraison:''


  });
}

tvaApplicableChanged(){
  this.childArticlePanel.setTvaNotApplicable(this.bonCForm.controls['tvaNotApplicable'].value)
}

async setOtherForms() {
  if (this.isDraft || this.isRead || this.isSent || this.isExpired) {
    if (this.bonCommande.motCleList.length)
      this.childKeyWord.setFormValues(this.bonCommande.motCleList);

    this.childArticlePanel.setFormValues(this.bonCommande.articleList);
    await this.childAddress.setFormValues(this.bonCommande.livraison.adresseLivraison);
  } else {
    setTimeout(() => {
      if (this.bonCommande.motCleList.length)
        this.childKeyWord.setFormValues(this.bonCommande.motCleList);
    }, 0);
  }
}

setValidationArticleForm(event : boolean){
  this.isArticleFormValid = event
}

onSubmit() {
  if (this.bonCForm.valid && ( this.isSelected || !this.isAddMode) && this.isArticleFormValid) {
    this.getFormValues();
    if (this.isAddMode) {
      this.createBonCommande();
    } else {
      this.updateBonCommande();
    }
  } else {
    console.log('Invalid Form');
  }
}
createBonCommande() {
  this.bonCommandeService.addBonCommande(this.bonCommande).subscribe({
    next: (data) => (this.bonCommande = data),
    error: (e) => console.log(e),
    complete: () => {
      this.submitOtherForms();
    },
  });
}

updateBonCommande() {
  if(this.isDraft || this.isRead || this.isSent|| this.isExpired)
  this.bonCommandeService.updateBonCommandeById(this.bonCommande.id,this.bonCommande).subscribe({
    next: (data) => (this.bonCommande = data),
    error: (e) => console.log(e),
    complete: () => {
      this.submitOtherForms();
    },
  });
}
getFormValues() {
  this.bonCommande.devise = this.bonCForm.controls['devise'].value;
  this.bonCommande.numero_externe = this.bonCForm.controls['numero_externe'].value;
  this.bonCommande.totalHT = this.childArticlePanel.totals.totalHTF
  this.bonCommande.totalTTC = this.childArticlePanel.totals.total
  this.bonCommande.note = this.bonCForm.controls['note'].value;
  this.bonCommande = this.childArticlePanel.getRemiseForm(this.bonCommande) as BonsCommande
  this.bonCommande = this.childSelectRecipient.getRecipient(this.bonCommande) as BonsCommande
  this.bonCommande = this.childReglementForm.getReglementForm(this.bonCommande) as BonsCommande
  if(this.bonCForm.get('livParam')){
  this.bonCommande.date_Livraison = this.bonCForm.controls['date_Livraison'].value;
  this.bonCommande.livraison.nombreColis=this.bonCForm.controls['nombreColis']?.value;
  this.bonCommande.livraison.poidsTotal=this.bonCForm.controls['poidsTotal']?.value;
  this.bonCommande.livraison.volume=this.bonCForm.controls['volume']?.value;
  this.bonCommande.livraison.numeroSuivi=this.bonCForm.controls['numeroSuivi']?.value;
  this.bonCommande.livraison.urlSuivi=this.bonCForm.controls['urlSuivi']?.value;

  }



}

setFormValues() {
  this.bonCForm.controls['devise'].setValue(this.bonCommande.devise)
  this.bonCForm.controls['numero_externe'].setValue(this.bonCommande.numero_externe)
  this.bonCForm.controls['note'].setValue(this.bonCommande.note)
  this.childArticlePanel.setRemiseForm(this.bonCommande)
  this.childSelectRecipient.setRecipient(this.bonCommande)
  this.childReglementForm.setReglementForm(this.bonCommande)
  console.log(this.bonCommande.fournisseur?.firstName,'fff')
  console.log(this.bonCForm.get('livParam')?.value,'liv')

  // if(this.bonCForm.get('livParam')){

  this.bonCForm.controls['date_Livraison'].setValue(this.bonCommande.date_Livraison );
  this.bonCForm.controls['nombreColis'].setValue(this.bonCommande.livraison.nombreColis)
  this.bonCForm.controls['volume'].setValue(this.bonCommande.livraison.volume)
  this.bonCForm.controls['poidsTotal'].setValue(this.bonCommande.livraison.poidsTotal)
  this.bonCForm.controls['numeroSuivi'].setValue(this.bonCommande.livraison.numeroSuivi)
  this.bonCForm.controls['urlSuivi'].setValue(this.bonCommande.livraison.urlSuivi)

  //}
 }


 async submitOtherForms() {
  const bon: BonsCommande = new BonsCommande();
  bon.id = this.bonCommande.id;

  if (this.isDraft || this.isRead || this.isSent || this.isExpired) {
    await Promise.all([
      this.childKeyWord.onSubmit(bon, this.isAddMode),
      this.childArticlePanel.onSubmit(bon, this.isAddMode),
      this.childAddress.onSubmit(this.bonCommande.livraison, this.isAddMode)
    ]);
  } else {
    await this.childKeyWord.onSubmit(bon, this.isAddMode);
  }

  this.router.navigateByUrl(this.navigate.f_commandePath);
}


currencyChanged(event : any){
  this.childArticlePanel.changeReductionType(event.symbol);
}

}
