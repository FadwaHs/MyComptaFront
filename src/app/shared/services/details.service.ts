import { DatePipe, DecimalPipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DevisStatus } from "src/app/private/gestion-facturation/enums/devis-status";
import { FactureAvoirStatus } from "src/app/private/gestion-facturation/enums/facture-avoir-status";
import { FactureSimpleStatus } from "src/app/private/gestion-facturation/enums/facture-simple-status";
import { Article } from "src/app/private/gestion-facturation/models/article";
import { Devis } from "src/app/private/gestion-facturation/models/devis";
import { Facture } from "src/app/private/gestion-facturation/models/facture";
import { FactureAcompte } from "src/app/private/gestion-facturation/models/facture-acompte";
import { FactureAvoir } from "src/app/private/gestion-facturation/models/facture-avoir";
import { FactureFournisseur } from "src/app/private/gestion-facturation/models/facture-fournisseur";
import { FactureSimple } from "src/app/private/gestion-facturation/models/facture-simple";

@Injectable({
  providedIn: 'root'
})
  export class DetailsService {

    constructor(
      private datePipe : DatePipe,
      private translate : TranslateService,
      private decimalPipe: DecimalPipe
    ){

    }


    statusTr :string
    transStatus(status: string ) :string{

      this.translate.get('STATUS.PROVISIONAL').subscribe((translation: string) => {
      this.statusTr = translation;});
     if(status == DevisStatus.SIGNED)
       this.translate.get('STATUS.SIGNED').subscribe((translation: string) => {
       this.statusTr = translation});
     if(status == 'FINALIZED' )
       this.translate.get('STATUS.FINALIZED').subscribe((translation: string) => {
       this.statusTr = translation});
     if(status == DevisStatus.REFUSED)
       this.translate.get('STATUS.REFUSED').subscribe((translation: string) => {
       this.statusTr = translation});
     if(status == 'PAYED')
       this.translate.get('STATUS.PAYED').subscribe((translation: string) => {
       this.statusTr = translation});
     if(status == 'TOPAYED')
       this.translate.get('STATUS.TOPAYED').subscribe((translation: string) => {
       this.statusTr = translation});
     if(status == 'REFUNDED')
       this.translate.get('STATUS.REFUNDED').subscribe((translation: string) => {
       this.statusTr = translation});
     if(status == 'WON')
       this.translate.get('STATUS.WON').subscribe((translation: string) => {
       this.statusTr = translation});
     if(status == 'LOST')
       this.translate.get('STATUS.LOST').subscribe((translation: string) => {
       this.statusTr = translation});
       if(status == 'CANCLED')
       this.translate.get('STATUS.CANCLED').subscribe((translation: string) => {
       this.statusTr = translation});
     if(status == 'CLOSED')
       this.translate.get('STATUS.CLOSED').subscribe((translation: string) => {
       this.statusTr = translation});
     if(status == 'LATE')
       this.translate.get('STATUS.LATE').subscribe((translation: string) => {
       this.statusTr = translation});
     if(status == 'INPROGRESS')
       this.translate.get('STATUS.INPROGRESS').subscribe((translation: string) => {
       this.statusTr = translation});

       //++
     if(status == 'DRAFT')
       this.translate.get('STATUS.DRAFT').subscribe((translation: string) => {
       this.statusTr = translation});

     if(status == 'TOBERESOLVED')
       this.translate.get('STATUS.TOBERESOLVED').subscribe((translation: string) => {
       this.statusTr = translation});

     if(status == 'PARTIAL')
       this.translate.get('STATUS.PARTIAL').subscribe((translation: string) => {
       this.statusTr = translation});

     if(status == 'PARTIAL')
       this.translate.get('STATUS.PARTIAL').subscribe((translation: string) => {
       this.statusTr = translation});

     if(status == 'PAID')
       this.translate.get('STATUS.PAID').subscribe((translation: string) => {
       this.statusTr = translation});

     if(status == 'CANCELLED')
       this.translate.get('STATUS.CANCLED').subscribe((translation: string) => {
       this.statusTr = translation});

     if(status == 'PENDING')
       this.translate.get('STATUS.PENDING').subscribe((translation: string) => {
       this.statusTr = translation});

     if(status == 'PARTIAL_DELIVERY')
       this.translate.get('STATUS.PARTIAL_DELIVERY').subscribe((translation: string) => {
       this.statusTr = translation});

     if(status == 'DELIVERED')
       this.translate.get('STATUS.DELIVERED').subscribe((translation: string) => {
       this.statusTr = translation});



       return this.statusTr

   }

    formatDate(date:Date): string{
      const format = 'dd MMMM yyyy \'à\' HH\'h\'mm';
      return this.datePipe.transform(date, format)!;
    }


    calulTotlHT(article :Article):number {
      var totalArticleHT:number =0
      totalArticleHT= article.prixHT * article.quantity
       if(article.reduction){
          if(!article.redIsPercentage){
            totalArticleHT= (article.prixHT * article.quantity) - article.reduction
          }
           else totalArticleHT =(article.prixHT * article.quantity)  * (1-article.reduction/100);
       }
      return totalArticleHT;

    }

    calulTotlTTC(article:Article):number {
      var totalArticleTTC:number =0
      totalArticleTTC= article.prixHT * article.quantity
       if(article.reduction){
          if(!article.redIsPercentage){
            totalArticleTTC= (totalArticleTTC- article.reduction )*(1 + (article.tva/100))
          }
           else totalArticleTTC =totalArticleTTC* (1- article.reduction/100)*(1 + (article.tva/100));
       }
       else totalArticleTTC=totalArticleTTC *(1 + (article.tva/100))
      return totalArticleTTC;

    }

    getCurrencySymbol(currency: string): string {
      const regex = /\(([^)]+)\)/;
      const matches = regex.exec(currency);
      return matches ? matches[1] : '';

    }

    getReductionSymbol(data :Devis | Facture|FactureFournisseur,remIsPercentage :boolean) :string {
       if(remIsPercentage)
         return "%"
       return this.getCurrencySymbol(data.devise)

    }

    calulTVA(article:Article):number {
      return  this.calulTotlTTC(article)-this.calulTotlHT(article)
    }

    formatNumber(num:number) :string{
      var dicimal ;
      dicimal =this.decimalPipe.transform(num,'1.2-2' )
      return dicimal ?dicimal :''

    }

    format2Number(num:number) :string{
      var dicimal ;
      dicimal =this.decimalPipe.transform(num,'1.0-0' )
      return dicimal ?dicimal :''

    }

    calulTVAPer(facture :Facture):number {
      return  (facture.totalTTC-facture.totalHT)* (100/facture.totalHT)
      }

    calculMontant(facture:FactureAcompte,montantT:number ):string{
      if(facture.monIsPercentage)
        return this.format2Number(facture.montantPayed) +"%"
      return this.format2Number((facture.montantPayed *100)/montantT) +'%'
    }



   }













