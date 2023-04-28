// export const baseUrl = "http://localhost:8082/api";
// export const societeUrl = baseUrl+"/societes";

import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ConstantUrl {
    public readonly baseUrl :string = "http://localhost:8082/api/";
    public readonly societeUrl :string = this.baseUrl+"societes";
    public readonly clientUrl :string = this.baseUrl+"clients";
    public readonly phoneUrl :string = this.baseUrl+"phones";
    public readonly motCleUrl :string = this.baseUrl+"mots-cle";
    public readonly addressUrl :string = this.baseUrl+"addresses";
    public readonly devisUrl :string = this.baseUrl+"devis";
    public readonly articleUrl : string = this.baseUrl+"articles";
    public readonly typeArticleUrl : string = this.baseUrl+"types-article";
    public readonly modeReglementUrl  : string = this.baseUrl+"modes-reglement";
    public readonly conditionReglementUrl : string = this.baseUrl+"conditions-reglement";
    public readonly interetUrl : string = this.baseUrl+"interets";
    public readonly numerotationUrl : string = this.baseUrl+"numerotations";
    public readonly factureSimpleUrl : string = this.baseUrl+"factures-simple";
    public readonly factureAvoirUrl : string = this.baseUrl+"factures-avoir";
    public readonly factureAcompteUrl : string = this.baseUrl+"factures-acompte";
    public readonly factureUrl : string = this.baseUrl+"factures";



}
