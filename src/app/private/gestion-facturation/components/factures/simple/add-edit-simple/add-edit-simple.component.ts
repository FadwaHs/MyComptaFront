import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import currencies from 'src/assets/json/currencies.json'
import { ArticlePanelComponent } from 'src/app/shared/components/article-panel/article-panel.component';
import { TextFieldFormComponent } from 'src/app/shared/components/text-field-form/text-field-form.component';
import { SelectRecipientComponent } from 'src/app/shared/components/select-recipient/select-recipient.component';
import { ReglementFormComponent } from 'src/app/shared/components/reglement-form/reglement-form.component';
import { KeyWordFormComponent } from 'src/app/shared/components/key-word-form/key-word-form.component';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import { FactureSimple } from 'src/app/private/gestion-facturation/models/facture-simple';
import { FactureSimpleService } from 'src/app/private/gestion-facturation/http/facture-simple.service';
import { FactureSimpleStatus } from 'src/app/private/gestion-facturation/enums/facture-simple-status';

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
  languages: string[] = ['Français', 'English'];
  defaultLang: string = 'Français';
  factureSimple: FactureSimple = new FactureSimple();
  factureSimpleForm: FormGroup;
  isAddMode: boolean = true;
  isSelected : boolean = false
  currencies : any[] = currencies
  currentCurrency : string
  isArticleFormValid : boolean = false
  isProvisional : boolean = true
  constructor(
    private formBuilder: FormBuilder,
    private factureSimpleService: FactureSimpleService,
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
      this.factureSimpleService.getFactureSimpleById(this.id).subscribe({
        next: (data) => {
          this.factureSimple = data

        },
        error: (err) => console.log(err),
        complete: () => {
          if(this.factureSimple.status !== FactureSimpleStatus.PROVISIONAL) this.isProvisional = false
          this.checkSlug();
          this.setOtherForms();
          if(this.isProvisional) this.setFormValues();
        },
      });
    } else {
      this.router.navigateByUrl(this.navigate.f_simplePath);
    }
  }



  checkSlug(){
    if (this.factureSimple.slug === this.slug) {
    } else {
      this.router.navigateByUrl(this.navigate.toEditPath('D',this.id,this.factureSimple.slug));
    }
  }

  initializeForms() {
    this.factureSimpleForm = this.formBuilder.group({
      devise: [this.currencies[0].name_symbol, Validators.required],
      tvaNotApplicable: false
    });
  }

  tvaApplicableChanged(){
    this.childArticlePanel.setTvaNotApplicable(this.factureSimpleForm.controls['tvaNotApplicable'].value)
  }

  setOtherForms(){
    if(this.isProvisional){
      if(this.factureSimple.motCleList.length) this.childKeyWord.setFormValues(this.factureSimple.motCleList)
      this.childArticlePanel.setFormValues(this.factureSimple.articleList)
    }
    else{
      setTimeout(() => {
        if(this.factureSimple.motCleList.length) this.childKeyWord.setFormValues(this.factureSimple.motCleList)
      }, 0);
    }
  }

  setValidationArticleForm(event : boolean){
    this.isArticleFormValid = event
  }

  onSubmit() {
    if (this.factureSimpleForm.valid && ( this.isSelected || !this.isAddMode) && this.isArticleFormValid) {
      this.getFormValues();
      if (this.isAddMode) {
        this.createNewFactureSimple();
      } else {
        this.updateFactureSimple();
      }
    } else {
      console.log('Invalid Form');
    }
  }

  createNewFactureSimple() {
    this.factureSimpleService.addFactureSimple(this.factureSimple).subscribe({
      next: (data) => (this.factureSimple = data),
      error: (e) => console.log(e),
      complete: () => {
        this.submitOtherForms();
      },
    });

  }

  updateFactureSimple(){
    if(this.isProvisional)
    this.factureSimpleService.updateFactureSimpleById(this.factureSimple.id,this.factureSimple).subscribe({
      next: (data) => (this.factureSimple = data),
      error: (e) => console.log(e),
      complete: () => {
        this.submitOtherForms();
      },
    });
  }

  async submitOtherForms() {
    var factureSimple : FactureSimple = new FactureSimple()
    factureSimple.id = this.factureSimple.id
    if(this.isProvisional){
      await this.childKeyWord.onSubmit(factureSimple,this.isAddMode);
      await this.childArticlePanel.onSubmit(factureSimple,this.isAddMode)
    }
    else{
      await this.childKeyWord.onSubmit(factureSimple,this.isAddMode);
    }
    this.router.navigateByUrl(this.navigate.f_simplePath);
  }

  getFormValues() {
    this.factureSimple.devise = this.factureSimpleForm.controls['devise'].value;
    this.factureSimple.totalHT = this.childArticlePanel.totals.totalHTF
    this.factureSimple.totalTTC = this.childArticlePanel.totals.total
    this.factureSimple = this.childTextField.getTextForm(this.factureSimple) as FactureSimple
    this.factureSimple = this.childArticlePanel.getRemiseForm(this.factureSimple) as FactureSimple
    this.factureSimple = this.childSelectRecipient.getRecipient(this.factureSimple) as FactureSimple
    this.factureSimple = this.childReglementForm.getReglementForm(this.factureSimple) as FactureSimple

  }

  setFormValues() {
    this.factureSimpleForm.controls['devise'].setValue(this.factureSimple.devise)
    this.childTextField.setTextForm(this.factureSimple)
    this.childArticlePanel.setRemiseForm(this.factureSimple)
    this.childSelectRecipient.setRecipient(this.factureSimple)
    this.childReglementForm.setReglementForm(this.factureSimple)
  }

  currencyChanged(event : any){
    this.childArticlePanel.changeReductionType(event.symbol);
  }

}
