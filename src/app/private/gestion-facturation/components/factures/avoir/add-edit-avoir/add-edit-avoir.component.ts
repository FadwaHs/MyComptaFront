import { Component, ViewChild } from '@angular/core';
import currencies from 'src/assets/json/currencies.json'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FactureAvoirStatus } from 'src/app/private/gestion-facturation/enums/facture-avoir-status';
import { FactureAvoirService } from 'src/app/private/gestion-facturation/http/facture-avoir.service';
import { FactureAvoir } from 'src/app/private/gestion-facturation/models/facture-avoir';
import { ArticlePanelComponent } from 'src/app/shared/components/article-panel/article-panel.component';
import { KeyWordFormComponent } from 'src/app/shared/components/key-word-form/key-word-form.component';
import { ReglementFormComponent } from 'src/app/shared/components/reglement-form/reglement-form.component';
import { SelectRecipientComponent } from 'src/app/shared/components/select-recipient/select-recipient.component';
import { TextFieldFormComponent } from 'src/app/shared/components/text-field-form/text-field-form.component';
import { NavigateService } from 'src/app/shared/services/navigate.service';

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

  @ViewChild(TextFieldFormComponent)
  childTextField: TextFieldFormComponent;

  @ViewChild(KeyWordFormComponent)
  childKeyWord: KeyWordFormComponent;

  factureAvoirForm :FormGroup

  id: number;
  slug: string;
  languages: string[] = ['Français', 'English'];
  defaultLang: string = 'Français';
  factureAvoir: FactureAvoir = new FactureAvoir();
  isAddMode: boolean = true;
  isSelected : boolean = false;
  currencies : any[] = currencies;
  currentCurrency : string
  isArticleFormValid : boolean = false
  isProvisional : boolean = true

  constructor(
    private formBuilder: FormBuilder,
    private factureAvoirService: FactureAvoirService,
    private router: Router,
    private route: ActivatedRoute,
    protected navigate : NavigateService
  ) {}


  async ngOnInit(): Promise<void> {
    this.initializeForms();

    if (this.route.snapshot.url[0].path == 'edit') {
      this.isAddMode = false;
      this.verifyRouteAndGetFactureAvoir();
    }
  }

  async verifyRouteAndGetFactureAvoir() {
    [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split(
      '-'
    );
    this.id = +this.id;
    if (this.id) {
      this.factureAvoirService.getFactureAvoirById(this.id).subscribe({
        next: (data) => {
          this.factureAvoir = data

        },
        error: (err) => console.log(err),
        complete: () => {
          if(this.factureAvoir.status !== FactureAvoirStatus.PROVISIONAL) this.isProvisional = false
          this.checkSlug();
          this.setOtherForms();
          if(this.isProvisional) this.setFormValues();
        },
      });
    } else {
      this.router.navigateByUrl(this.navigate.f_avoirPath);
    }
  }

  checkSlug(){
    if (this.factureAvoir.slug === this.slug) {
    } else {
      this.router.navigateByUrl(this.navigate.toEditPath('A',this.id,this.factureAvoir.slug));
    }
  }

  initializeForms() {
    this.factureAvoirForm = this.formBuilder.group({
      devise: [this.currencies[0].name_symbol, Validators.required],
      tvaNotApplicable: false
    });
  }

  tvaApplicableChanged(){
    this.childArticlePanel.setTvaNotApplicable(this.factureAvoirForm.controls['tvaNotApplicable'].value)
  }

  setOtherForms(){
    if(this.isProvisional){
      if(this.factureAvoir.motCleList.length) this.childKeyWord.setFormValues(this.factureAvoir.motCleList)
      this.childArticlePanel.setFormValues(this.factureAvoir.articleList)
    }
    else{
      setTimeout(() => {
        if(this.factureAvoir.motCleList.length) this.childKeyWord.setFormValues(this.factureAvoir.motCleList)
      }, 0);
    }
  }

  setValidationArticleForm(event : boolean){
    this.isArticleFormValid = event
  }

  onSubmit() {
    if (this.factureAvoirForm.valid && ( this.isSelected || !this.isAddMode) && this.isArticleFormValid) {
      this.getFormValues();
      if (this.isAddMode) {
        this.createNewFactureAvoir();
      } else {
        this.updateFactureAvoir();
      }
    } else {
      console.log('Invalid Form');

    }
  }

  createNewFactureAvoir() {
    this.factureAvoirService.addFactureAvoir(this.factureAvoir).subscribe({
      next: (data) => (this.factureAvoir = data),
      error: (e) => console.log(e),
      complete: () => {
        // console.log(this.factureAvoir.client?.firstName,'createe');

        this.submitOtherForms();
      },
    });
  }

  updateFactureAvoir() {
    if(this.isProvisional)
    this.factureAvoirService.updateFactureAvoirById(this.factureAvoir.id,this.factureAvoir).subscribe({
      next: (data) => (this.factureAvoir = data),
      error: (e) => console.log(e),
      complete: () => {
        this.submitOtherForms();
      },
    });
  }

  async submitOtherForms() {
    var factureAvoir : FactureAvoir = new FactureAvoir()
    factureAvoir.id = this.factureAvoir.id
    if(this.isProvisional){
      await this.childKeyWord.onSubmit(factureAvoir,this.isAddMode);
      await this.childArticlePanel.onSubmit(factureAvoir,this.isAddMode)
    }
    else{
      await this.childKeyWord.onSubmit(factureAvoir,this.isAddMode);
    }
    this.router.navigateByUrl(this.navigate.f_avoirPath);
  }

  getFormValues() {
    this.factureAvoir.devise = this.factureAvoirForm.controls['devise'].value;
    this.factureAvoir.totalHT = this.childArticlePanel.totals.totalHTF
    this.factureAvoir.totalTTC = this.childArticlePanel.totals.total
    this.factureAvoir = this.childTextField.getTextForm(this.factureAvoir) as FactureAvoir
    this.factureAvoir = this.childArticlePanel.getRemiseForm(this.factureAvoir) as FactureAvoir
    this.factureAvoir = this.childSelectRecipient.getRecipient(this.factureAvoir) as FactureAvoir
    this.factureAvoir = this.childReglementForm.getReglementForm(this.factureAvoir) as FactureAvoir




  }

  setFormValues() {
    this.factureAvoirForm.controls['devise'].setValue(this.factureAvoir.devise)
    this.childTextField.setTextForm(this.factureAvoir)
    this.childArticlePanel.setRemiseForm(this.factureAvoir)
    this.childSelectRecipient.setRecipient(this.factureAvoir)
    this.childReglementForm.setReglementForm(this.factureAvoir)
  }

  currencyChanged(event : any){
    this.childArticlePanel.changeReductionType(event.symbol);
  }

}






