import { BonsCommande } from './../../../private/gestion-facturation/models/bons-commande';
import { AvoireFournisseur } from './../../../private/gestion-facturation/models/avoir-fournisseur';
import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ArticleService } from 'src/app/private/gestion-facturation/http/article.service';
import { TypeArticleService } from 'src/app/private/gestion-facturation/http/type-article.service';
import { Article } from 'src/app/private/gestion-facturation/models/article';
import { Bons } from 'src/app/private/gestion-facturation/models/bons';
import { BonLivraison } from 'src/app/private/gestion-facturation/models/bons-livraison';
import { Devis } from 'src/app/private/gestion-facturation/models/devis';
import { Facture } from 'src/app/private/gestion-facturation/models/facture';
import { FactureAvoir } from 'src/app/private/gestion-facturation/models/facture-avoir';
import { FactureSimple } from 'src/app/private/gestion-facturation/models/facture-simple';
import { SimpleFournisseur } from 'src/app/private/gestion-facturation/models/simple-fournisseur';
import { TypeArticle } from 'src/app/private/gestion-facturation/models/type-article';

class Totals{
  totalHT :number = 0
  remise :number = 0
  totalHTF :number = 0
  tva :number = 0
  total :number = 0
}

@Component({
  selector: 'app-article-panel',
  templateUrl: './article-panel.component.html',
  styleUrls: ['./article-panel.component.scss']
})
export class ArticlePanelComponent implements OnInit {

  @Output()
  isFormValid : EventEmitter<boolean> = new EventEmitter()

  @Input()

  for : 'D' | 'F'|'A'|'SF'|'AF'|'BL'|'BC'


  tvaNotApplicable : boolean
  typesArticle : TypeArticle[]
  articleForms : Array<FormGroup> = new Array<FormGroup>();
  articles : Array<Article>
  remiseForm : FormGroup
  reductionType =['%','MAD']
  currentCurrency : string = 'MAD'
  totals : Totals = new Totals()
  min: number = 1
  bgPanel = { id : 0, colored: false }

  constructor(
    private typeArticleService: TypeArticleService,
    private articleService : ArticleService,
    private formBuilder : FormBuilder,
    private decimalPipe: DecimalPipe
  ) { }

  async ngOnInit() {
    this.initRemiseForm()
    await this.setTypesArticle()
    this.addArticleForm(-1)

  }

  initRemiseForm(){
    this.remiseForm = this.formBuilder.group({
      remise: null,
      remiseType : this.reductionType[0]
    })
  }

  async setTypesArticle(){
    this.typesArticle  = await firstValueFrom(this.typeArticleService.getTypeArticleList())
  }

  changeReductionType(currency : string){
    this.currentCurrency = currency
    this.reductionType =['%',currency]
    this.articleForms.forEach(articleForm =>{
      if(articleForm.controls['reductionType'].value != '%')
      articleForm.controls['reductionType'].setValue(this.reductionType[1])
    })
    if(this.remiseForm.controls['remiseType'].value != '%')
    this.remiseForm.controls['remiseType'].setValue(this.reductionType[1])
  }

  getRemiseForm(data :any) : any{
    data.remise = this.remiseForm.controls['remise'].value
    if(this.remiseForm.controls['remiseType'].value == '%') data.remIsPercentage = true
    else data.remIsPercentage = false
    return data;
  }

  setRemiseForm(data : any) {

      if(data.remIsPercentage) this.remiseForm.controls['remiseType'].setValue(this.reductionType[0])
      else this.remiseForm.controls['remiseType'].setValue(this.reductionType[1])
      this.remiseForm.controls['remise'].setValue(data.remise)
  }



  setTvaNotApplicable(tvaNotApplicable : boolean){
    this.tvaNotApplicable = tvaNotApplicable
    if(this.tvaNotApplicable){
      this.articleForms.forEach(articleForm =>{
        articleForm.controls['tva'].disable()
      })
    }
    else{
      this.articleForms.forEach(articleForm =>{
        articleForm.controls['tva'].enable()
      })
    }
    this.calculate();
  }

  addArticleForm(i:number){
    var articleForm : FormGroup
    articleForm = this.formBuilder.group({
      typeArticle: this.typesArticle[0] ,
      quantity: [null, Validators.required],
      prixHT: [null, Validators.required],
      tva: 20,
      reduction: null ,
      reductionType: this.reductionType[0],
      totalHT : {value : null , disabled: true},
      totalTTC :{value : null , disabled: true},
      description: null,
    });

    i++
    this.articleForms.splice(i, 0, articleForm);
    if(i!=0) this.setBgPanel(i)
    this.setTvaNotApplicable(this.tvaNotApplicable)
  }

  duplicateArticleForm(i:number){
    this.addArticleForm(i)
    this.articleForms[i+1].patchValue({
      typeArticle: this.articleForms[i].controls['typeArticle'].value,
      quantity: this.articleForms[i].controls['quantity'].value,
      prixHT: this.articleForms[i].controls['prixHT'].value,
      tva: this.articleForms[i].controls['tva'].value,
      reduction: this.articleForms[i].controls['reduction'].value ,
      reductionType: this.articleForms[i].controls['reductionType'].value,
      totalHT : this.articleForms[i].controls['totalHT'].value,
      totalTTC :this.articleForms[i].controls['totalTTC'].value,
      description: this.articleForms[i].controls['description'].value
    })
    this.setBgPanel(i+1)
    this.calculate()
  }

  removeArticleForm(i : number ){
    if (this.articleForms.length > this.min) {
      this.articleForms.splice(i, 1);
      this.calculate()
    }
  }

  movePanelToAbove(i:number){
    if(i > 0){
      var articleForm :FormGroup = this.articleForms[i]
      this.articleForms.splice(i, 1);
      this.articleForms.splice(i-1, 0, articleForm);
    }
  }

  movePanelToBottom(i:number){
    if(i < this.articleForms.length-1){
      var articleForm :FormGroup = this.articleForms[i]
      this.articleForms.splice(i, 1);
      this.articleForms.splice(i+1, 0, articleForm);
    }
  }

  setBgPanel(i:number){
    this.bgPanel.id = i
    this.bgPanel.colored = true
    setTimeout(() => {
      this.bgPanel.colored = false
    }, 500);
  }

  calculate(){
    this.totals = new Totals()
    var formValid : boolean = false
    this.articleForms.forEach( articleForm =>{
      this.calculateOneArticle(articleForm)
      if(articleForm.controls['quantity'].value && articleForm.controls['prixHT'].value)
      formValid = true
      this.isFormValid.emit(formValid)
    })

    if(!this.remiseForm.controls['remise'].value){
      this.totals.remise = 0
    }
    else{
      if(this.checkRemiseType(this.remiseForm)){
        if(this.remiseForm.controls['remise'].value > 50){
          this.remiseForm.controls['remise'].setValue(50)
        }
        this.totals.remise = this.totals.totalHT/100*this.remiseForm.controls['remise'].value
      }
      else{
        if(this.remiseForm.controls['remise'].value > this.totals.totalHT/2){
          this.remiseForm.controls['remise'].setValue(this.totals.totalHT/2)
        }
        this.totals.remise = this.remiseForm.controls['remise'].value
      }
    }

    this.totals.totalHTF = this.totals.totalHT - this.totals.remise
    this.totals.total = this.totals.totalHTF + this.totals.tva

  }


  calculateOneArticle(articleForm : FormGroup){
    var quantity, prixHT, tva, reduction :number;
    var totalHT, totalTTC : number

    if(!articleForm.controls['quantity'].value) quantity = 0
    else quantity = articleForm.controls['quantity'].value
    if(!articleForm.controls['prixHT'].value) prixHT = 0
    else prixHT = articleForm.controls['prixHT'].value
    if(!articleForm.controls['tva'].value || this.tvaNotApplicable ) tva = 0
    else tva = articleForm.controls['tva'].value
    if(!articleForm.controls['reduction'].value) reduction = 0
    else reduction = articleForm.controls['reduction'].value

    if(this.checkReductionType(articleForm)){
      if(reduction > 50){
        articleForm.controls['reduction'].setValue(50)
        reduction = 50
      }
      totalHT =  (quantity*prixHT) * (1-reduction/100);
    }
    else{
      if(reduction > ((quantity*prixHT)/2)){
        articleForm.controls['reduction'].setValue(((quantity*prixHT)/2))
        reduction = ((quantity*prixHT)/2)
      }
      totalHT =  (quantity*prixHT) - reduction ;
    }

    totalTTC = totalHT*(1 + tva/100)

    articleForm.controls['totalHT'].setValue( this.decimalPipe.transform(totalHT,'1.0-2' ))
    articleForm.controls['totalTTC'].setValue( this.decimalPipe.transform(totalTTC,'1.0-2' ))

    this.totals.totalHT +=  totalHT
    this.totals.tva += totalHT/100*tva;

  }

  setFormValues(articles: Article[]) {
    this.articles = articles
    for (let i = 0; i < this.articles.length; i++) {
      if(i != 0) this.addArticleForm(i)
      this.articleForms[i].patchValue({
        typeArticle: this.articles[i].typeArticle,
        quantity: this.articles[i].quantity,
        prixHT: this.articles[i].prixHT,
        tva: this.articles[i].tva,
        reductionType: this.getreductionType(this.articles[i].redIsPercentage),
        reduction: this.articles[i].reduction ,
        description: this.articles[i].description,
      })
    }
    this.calculate()
  }


  async onSubmit(data: any, isAddMode : boolean) {


    // if(this.formService.checkForm(this.phoneForm)){

      if(!isAddMode){
        await this.deleteOldArticles();
      }

      this.getFormValue();

      this.articles.forEach((article) => {

        if (this.for == 'D') article.devis = data as Devis;
        else if (this.for == 'F') article.factureSimple = data as FactureSimple;
        else if (this.for == 'A') article.factureAvoir = data as FactureAvoir;

        else if (this.for == 'SF') article.simpleFournisseur = data as SimpleFournisseur;
        else if (this.for == 'AF') article.avoireFournisseur = data as AvoireFournisseur;

        else if (this.for == 'BL') article.bonLivraison =  data as BonLivraison;
        else if (this.for == 'BC') article.bonsCommande =  data as BonsCommande;



        else return

        this.articleService.addArticle(article).subscribe({
          next: (res) => article = res,
          error: (e) => console.log(e),
        });

      });
  }

  getFormValue(){
    this.articles = new Array<Article>()
    this.articleForms.forEach( articleForm => {
      if (
        articleForm.controls['quantity'].value &&
        articleForm.controls['prixHT'].value
      ) {
        var article = new Article();
        article.prixHT = articleForm.controls['prixHT'].value;
        article.quantity = articleForm.controls['quantity'].value;
        article.reduction = articleForm.controls['reduction'].value;
        if(this.tvaNotApplicable) article.tva = 0
        else article.tva = articleForm.controls['tva'].value;
        article.reduction = articleForm.controls['reduction'].value;
        article.redIsPercentage  = this.checkReductionType(articleForm)
        article.typeArticle = articleForm.controls['typeArticle'].value;
        article.description = articleForm.controls['description'].value;
        this.articles.push(article);
      }
    });
  }

  async deleteOldArticles(){
    for(let i = 0; i < this.articles.length; i++) {
      await firstValueFrom( this.articleService.deleteArticleById(this.articles[i].id) ).catch( e =>{
        console.log(e)
      })
    }
  }

  checkReductionType(articleForm :FormGroup) : boolean{
    return articleForm.controls['reductionType'].value == '%'
  }
  checkRemiseType(articleForm :FormGroup) : boolean{
    return articleForm.controls['remiseType'].value == '%'
  }

  getreductionType(isPercentage : boolean) : string{
    if(isPercentage) return this.reductionType[0]
    else return this.reductionType[1]
  }
}

