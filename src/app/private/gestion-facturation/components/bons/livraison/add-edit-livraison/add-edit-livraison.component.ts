import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BLStatus } from 'src/app/private/gestion-facturation/enums/BLStatus';
import { BonLivraisonService } from 'src/app/private/gestion-facturation/http/bonLivraison.service';
import { FournisseurService } from 'src/app/private/gestion-facturation/http/fournisseur.service';
import { BonLivraison } from 'src/app/private/gestion-facturation/models/bons-livraison';
import { Fournisseur } from 'src/app/private/gestion-facturation/models/fournisseur';
import { ArticlePanelComponent } from 'src/app/shared/components/article-panel/article-panel.component';
import { KeyWordFormComponent } from 'src/app/shared/components/key-word-form/key-word-form.component';
import { NavigateService } from 'src/app/shared/services/navigate.service';
import currencies from 'src/assets/json/currencies.json'

@Component({
  selector: 'app-add-edit-livraison',
  templateUrl: './add-edit-livraison.component.html',
  styleUrls: ['./add-edit-livraison.component.scss']
})

export class AddEditLivraisonComponent implements OnInit{

  @ViewChild(ArticlePanelComponent)
  childArticlePanel: ArticlePanelComponent;

  @ViewChild(KeyWordFormComponent)
  childKeyWord: KeyWordFormComponent;

  id: number;
  slug: string;
  isAddMode: boolean = true;
  BLForm: FormGroup;
  selectedfournisseur: Fournisseur;
  items: Fournisseur[];
  isArticleFormValid : boolean = false
  bonLivraison: BonLivraison = new BonLivraison();
  // for devise
  currencies : any[] = currencies
  currentCurrency : string
  isModifiable : boolean = true

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    protected navigate : NavigateService,
    private formBuilder: FormBuilder,
    private fournisseurService : FournisseurService,
    private bonLivraisonService : BonLivraisonService

    ){}



  ngOnInit(): void {

    this.initializeForms();
    this.initfournisseur();

    //for edit path:
    if (this.route.snapshot.url[0].path == 'edit') {
      this.isAddMode = false;
      this.verifyRouteAndGetBonlivraison();
    }

  }

  async verifyRouteAndGetBonlivraison() {
    [this.id, this.slug] = await this.route.snapshot.params['id-slug'].split(
      '-'
    );
    this.id = +this.id;
    if (this.id) {
      this.bonLivraisonService.getBonLivraisonById(this.id).subscribe({
        next: (data) => {
          this.bonLivraison = data

        },
        error: (err) => console.log(err),
        complete: () => {
          if(this.bonLivraison.blStatus == BLStatus.Invoiced) this.isModifiable = false
          this.checkSlug();
          this.setOtherForms();
          if(this.isModifiable) this.setFormValues();
        },
      });
    } else {
      this.router.navigateByUrl(this.navigate.f_simplePath);
    }
  }


  checkSlug(){
    if (this.bonLivraison.slug === this.slug) {
    } else {
      this.router.navigateByUrl(this.navigate.toEditPath('BL',this.id,this.bonLivraison.slug));
    }
  }


  initializeForms() {

    this.BLForm = this.formBuilder.group({
      fournisseur : null,
      numeroExterne:null,
      note:null,
      devise: [this.currencies[0].name_symbol, Validators.required],
      tvaNotApplicable: false
     });
  }

  async initfournisseur() {
    this.items =  await firstValueFrom(this.fournisseurService.getAllFournisseur());
  }

  setValidationArticleForm(event : boolean){
    this.isArticleFormValid = event
  }

  tvaApplicableChanged(){
    this.childArticlePanel.setTvaNotApplicable(this.BLForm.controls['tvaNotApplicable'].value)
  }

  setOtherForms(){
    if(this.isModifiable){
      if(this.bonLivraison.motCleList.length) this.childKeyWord.setFormValues(this.bonLivraison.motCleList)
      this.childArticlePanel.setFormValues(this.bonLivraison.articleList)
    }
    else{
      setTimeout(() => {
        if(this.bonLivraison.motCleList.length) this.childKeyWord.setFormValues(this.bonLivraison.motCleList)
      }, 0);
    }
  }


  onSubmit() {
    if (this.BLForm.valid && ( this.selectedfournisseur || !this.isAddMode) && this.isArticleFormValid) {
      this.getFormValues();
      if (this.isAddMode) {
        this.createNewBLivraison();
      } else {
        this.updateBlivraison();
      }
    } else {
      console.log('Invalid Form');
    }
  }

  updateBlivraison(){
    if(this.isModifiable)
    this.bonLivraisonService.updateBonLivraisonById(this.bonLivraison.id,this.bonLivraison).subscribe({
      next: (data) => (this.bonLivraison = data),
      error: (e) => console.log(e),
      complete: () => {
        this.submitOtherForms();
      },
    });
  }


  createNewBLivraison() {

    this.bonLivraisonService.addBonLivraison(this.bonLivraison).subscribe({
      next: (data) => (this.bonLivraison = data),
      error: (e) => console.log(e),
      complete: () => {
        this.submitOtherForms();
      },
    });
  }

  async submitOtherForms() {

    var bonLivraison : BonLivraison = new BonLivraison()
    bonLivraison.id = this.bonLivraison.id

     if(this.isModifiable){
        await this.childArticlePanel.onSubmit(bonLivraison,this.isAddMode)
        await this.childKeyWord.onSubmit(bonLivraison,this.isAddMode);
    }
    else{
      await this.childKeyWord.onSubmit(bonLivraison,this.isAddMode);
    }

    this.router.navigateByUrl(this.navigate.f_livraisonPath);
  }

  getFormValues() {

    this.bonLivraison.numero_externe = this.BLForm.controls['numeroExterne'].value;
    this.bonLivraison.fournisseur =  this.BLForm.controls['fournisseur'].value as Fournisseur;
    this.bonLivraison.devise = this.BLForm.controls['devise'].value;
    this.bonLivraison.note = this.BLForm.controls['note'].value;
    this.bonLivraison.totalHT = this.childArticlePanel.totals.totalHTF
    this.bonLivraison.totalTTC = this.childArticlePanel.totals.total
    this.bonLivraison = this.childArticlePanel.getRemiseForm(this.bonLivraison) as BonLivraison

  }

  setFormValues() {

    this.BLForm.controls['devise'].setValue(this.bonLivraison.devise)
    this.BLForm.controls['numeroExterne'].setValue(this.bonLivraison.numero_externe)
    this.BLForm.controls['fournisseur'].setValue(this.bonLivraison.fournisseur)
    this.BLForm.controls['note'].setValue(this.bonLivraison.note)
    this.childArticlePanel.setRemiseForm(this.bonLivraison)
  }

  currencyChanged(event : any){
    this.childArticlePanel.changeReductionType(event.symbol);
  }





}
