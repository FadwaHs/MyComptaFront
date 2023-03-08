import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DevisService } from 'src/app/private/http/devis.service';
import { Devis } from 'src/app/private/models/devis';
import { KeyWordFormComponent } from '../../../../shared/components/key-word-form/key-word-form.component';
import currencies from 'src/assets/json/currencies.json'
import { ArticlePanelComponent } from 'src/app/shared/components/article-panel/article-panel.component';
import { TextFieldFormComponent } from 'src/app/shared/components/text-field-form/text-field-form.component';
import { SelectRecipientComponent } from 'src/app/shared/components/select-recipient/select-recipient.component';
import { ReglementFormComponent } from 'src/app/shared/components/reglement-form/reglement-form.component';
import { Client } from 'src/app/private/models/client';
import { DevisStatus } from 'src/app/private/enums/devis-status';
@Component({
  selector: 'app-add-edit-devis',
  templateUrl: './add-edit-devis.component.html',
  styleUrls: ['./add-edit-devis.component.scss']
})
export class AddEditDevisComponent implements OnInit {

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
  devis: Devis = new Devis();
  devisForm: FormGroup;
  isAddMode: boolean = true;
  isSelected : boolean = false
  currencies : any[] = currencies
  currentCurrency : string
  isArticleFormValid : boolean = false 
  isProvisional : boolean = true
  constructor(
    private formBuilder: FormBuilder,
    private devisService: DevisService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.initializeForms();

    if (this.route.snapshot.url[0].path == 'edit') {
      this.isAddMode = false;
      this.verifyRouteAndGetDevis();
    }

  }

  async verifyRouteAndGetDevis() {
    [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split(
      '-'
    );
    this.id = +this.id;
    if (this.id) {
      this.devisService.getDevisById(this.id).subscribe({
        next: (data) => {
          this.devis = data
          
        },
        error: (err) => console.log(err),
        complete: () => {
          if(this.devis.status !== DevisStatus.PROVISIONAL) this.isProvisional = false
          this.checkSlug();
          this.setOtherForms();
          if(this.isProvisional) this.setFormValues();
        },
      });
    } else {
      this.router.navigateByUrl('devis');
    }
  }

  

  checkSlug() {
    if (this.devis.slug === this.slug) {
    } else {
      this.router.navigateByUrl(
        `devis/edit/${this.id}-${this.devis.slug}`
      );
    }
  }

  initializeForms() {
    this.devisForm = this.formBuilder.group({
      validationDuration: null,
      devise: [this.currencies[0].name_symbol, Validators.required],
      tvaNotApplicable: false
    });
  }

  tvaApplicableChanged(){
    this.childArticlePanel.setTvaNotApplicable(this.devisForm.controls['tvaNotApplicable'].value)
  }

  setOtherForms(){
    if(this.isProvisional){
      if(this.devis.motCleList.length) this.childKeyWord.setFormValues(this.devis.motCleList)
      this.childArticlePanel.setFormValues(this.devis.articleList)
    }
    else{
      setTimeout(() => {
        if(this.devis.motCleList.length) this.childKeyWord.setFormValues(this.devis.motCleList)
      }, 0);
    }
  }

  setValidationArticleForm(event : boolean){
    this.isArticleFormValid = event
  }

  onSubmit() {
    if (this.devisForm.valid && ( this.isSelected || !this.isAddMode) && this.isArticleFormValid) {
      this.getFormValues();
      if (this.isAddMode) {
        this.createNewDevis();
      } else {
        this.updateDevis();
      }
    } else {
      console.log('Invalid Form');
    }
  }

  createNewDevis() {
    this.devisService.addDevis(this.devis).subscribe({
      next: (data) => (this.devis = data),
      error: (e) => console.log(e),
      complete: () => {
        this.submitOtherForms();
      },
    });

  }

  updateDevis(){
    if(this.isProvisional)
    this.devisService.updateDevisById(this.devis.id,this.devis).subscribe({
      next: (data) => (this.devis = data),
      error: (e) => console.log(e),
      complete: () => {
        this.submitOtherForms();
      },
    });
  }

  async submitOtherForms() {
    var devis : Devis = new Devis()
    devis.id = this.devis.id
    if(this.isProvisional){
      await this.childKeyWord.onSubmit(devis,this.isAddMode);
      await this.childArticlePanel.onSubmit(devis,this.isAddMode)
    }
    else{
      await this.childKeyWord.onSubmit(devis,this.isAddMode);
    }
    this.router.navigateByUrl('devis');
  }

  getFormValues() {
    this.devis.validationDuration = this.devisForm.controls['validationDuration'].value;
    this.devis.devise = this.devisForm.controls['devise'].value;
    this.devis.totalHT = this.childArticlePanel.totals.totalHTF
    this.devis.totalTTC = this.childArticlePanel.totals.total
    this.devis = this.childTextField.getTextForm(this.devis) as Devis
    this.devis = this.childArticlePanel.getRemiseForm(this.devis) as Devis
    this.devis = this.childSelectRecipient.getRecipient(this.devis) as Devis
    this.devis = this.childReglementForm.getReglementForm(this.devis) as Devis
    
  }

  setFormValues() {
    this.devisForm.controls['validationDuration'].setValue(this.devis.validationDuration)
    this.devisForm.controls['devise'].setValue(this.devis.devise)
    this.childTextField.setTextForm(this.devis)
    this.childArticlePanel.setRemiseForm(this.devis)
    this.childSelectRecipient.setRecipient(this.devis)
    this.childReglementForm.setReglementForm(this.devis)
  }

  currencyChanged(event : any){
    this.childArticlePanel.changeReductionType(event.symbol); 
  }

}
