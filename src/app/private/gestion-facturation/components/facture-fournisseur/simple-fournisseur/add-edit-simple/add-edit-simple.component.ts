import { SimpleFournisseur } from './../../../../models/simple-fournisseur';
import { FactureAcompteStatus } from 'src/app/private/gestion-facturation/enums/facture-acompte-status';
import { FactureFournisseur } from './../../../../models/facture-fournisseur';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { SimpleFournisseurService } from 'src/app/private/gestion-facturation/http/simple-fournisseur.service';
import { ArticlePanelComponent } from 'src/app/shared/components/article-panel/article-panel.component';
import { KeyWordFormComponent } from 'src/app/shared/components/key-word-form/key-word-form.component';
import { ReglementFormComponent } from 'src/app/shared/components/reglement-form/reglement-form.component';
import { SelectRecipientComponent } from 'src/app/shared/components/select-recipient/select-recipient.component';
import { TextFieldFormComponent } from 'src/app/shared/components/text-field-form/text-field-form.component';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import currencies from 'src/assets/json/currencies.json'
import { SimpleFournisseurStatus } from 'src/app/private/gestion-facturation/enums/simple-fournisseur-status';

@Component({
  selector: 'app-add-edit-simple',
  templateUrl: './add-edit-simple.component.html',
  styleUrls: ['./add-edit-simple.component.scss']
})
export class AddEditSimpleComponent {


@ViewChild(SelectRecipientComponent)
  childSelectRecipient: SelectRecipientComponent;

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
factureFournisseur :SimpleFournisseur =new SimpleFournisseur();
factFournForm: FormGroup;
isAddMode: boolean = true;
isSelected : boolean = false
currencies : any[] = currencies
currentCurrency : string
isArticleFormValid : boolean = false
isDraft : boolean = true




  constructor(
    private formBuilder: FormBuilder,
    private factureFournisseurService: SimpleFournisseurService,
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
      this.factureFournisseurService.getSimpleFourById(this.id).subscribe({
        next: (data) => {
          this.factureFournisseur = data

        },
        error: (err) => console.log(err),
        complete: () => {
          if(this.factureFournisseur.status !== SimpleFournisseurStatus.DRAFT) this.isDraft = false
          this.checkSlug();
          this.setOtherForms();
          if(this.isDraft) this.setFormValues();
        },
      });
    } else {
      this.router.navigateByUrl(this.navigate.f_simpleFournisseurPath);
    }
  }
  checkSlug(){
    if (this.factureFournisseur.slug === this.slug) {
    } else {
      this.router.navigateByUrl(this.navigate.toEditPath('SF',this.id,this.factureFournisseur.slug));
    }
  }


  initializeForms() {
    this.factFournForm = this.formBuilder.group({
      devise: [this.currencies[0].name_symbol, Validators.required],
      tvaNotApplicable: false,
      numero_externe: ''

    });
  }

  tvaApplicableChanged(){
    this.childArticlePanel.setTvaNotApplicable(this.factFournForm.controls['tvaNotApplicable'].value)
  }

  setOtherForms(){
    if(this.isDraft){
      if(this.factureFournisseur.motCleList.length) this.childKeyWord.setFormValues(this.factureFournisseur.motCleList)
      this.childArticlePanel.setFormValues(this.factureFournisseur.articleList)
    }
    else{
      setTimeout(() => {
        if(this.factureFournisseur.motCleList.length) this.childKeyWord.setFormValues(this.factureFournisseur.motCleList)
      }, 0);
    }
  }

  setValidationArticleForm(event : boolean){
    this.isArticleFormValid = event
  }

  onSubmit() {
    if (this.factFournForm.valid && ( this.isSelected || !this.isAddMode) && this.isArticleFormValid) {
      this.getFormValues();
      if (this.isAddMode) {
        this.createSimpleFactureFournisseur();
      } else {
        this.updateSimpleFactureFournisseur();
      }
    } else {
      console.log('Invalid Form');
    }
  }
  createSimpleFactureFournisseur() {
    this.factureFournisseurService.addSimpleFour(this.factureFournisseur).subscribe({
      next: (data) => (this.factureFournisseur = data),
      error: (e) => console.log(e),
      complete: () => {
        this.submitOtherForms();
      },
    });
  }

  updateSimpleFactureFournisseur() {
    if(this.isDraft)
    this.factureFournisseurService.updateSimpleFourById(this.factureFournisseur.id,this.factureFournisseur).subscribe({
      next: (data) => (this.factureFournisseur = data),
      error: (e) => console.log(e),
      complete: () => {
        this.submitOtherForms();
      },
    });
  }
  getFormValues() {
    this.factureFournisseur.devise = this.factFournForm.controls['devise'].value;
    this.factureFournisseur.numero_externe = this.factFournForm.controls['numero_externe'].value;
    this.factureFournisseur.totalHT = this.childArticlePanel.totals.totalHTF
    this.factureFournisseur.totalTTC = this.childArticlePanel.totals.total
    this.factureFournisseur = this.childTextField.getTextForm(this.factureFournisseur) as SimpleFournisseur
    this.factureFournisseur = this.childArticlePanel.getRemiseForm(this.factureFournisseur) as SimpleFournisseur
    this.factureFournisseur = this.childSelectRecipient.getRecipient(this.factureFournisseur) as SimpleFournisseur
    this.factureFournisseur = this.childReglementForm.getReglementForm(this.factureFournisseur) as SimpleFournisseur

  }

  setFormValues() {
    this.factFournForm.controls['devise'].setValue(this.factureFournisseur.devise)
    this.factFournForm.controls['numero_externe'].setValue(this.factureFournisseur.numero_externe)
    this.childTextField.setTextForm(this.factureFournisseur)
    this.childArticlePanel.setRemiseForm(this.factureFournisseur)
    this.childSelectRecipient.setRecipient(this.factureFournisseur)
    this.childReglementForm.setReglementForm(this.factureFournisseur)
  }


  async submitOtherForms() {
    var facture : SimpleFournisseur = new SimpleFournisseur()
    facture.id = this.factureFournisseur.id
    if(this.isDraft){
      await this.childKeyWord.onSubmit(facture,this.isAddMode);
      await this.childArticlePanel.onSubmit(facture,this.isAddMode)
    }
    else{
      await this.childKeyWord.onSubmit(facture,this.isAddMode);
    }
    this.router.navigateByUrl(this.navigate.f_simpleFournisseurPath);
  }

  currencyChanged(event : any){
    this.childArticlePanel.changeReductionType(event.symbol);
  }

}
