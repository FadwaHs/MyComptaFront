
import { AvoireFournisseur } from './avoir-fournisseur';
import { SimpleFournisseur } from './simple-fournisseur';

import { Bons } from "./bons"
import { BonLivraison } from "./bons-livraison"

import { Devis } from "./devis"
import { Facture } from "./facture"
import { FactureAvoir } from "./facture-avoir"
import { FactureSimple } from "./facture-simple"
import { TypeArticle } from "./type-article"

export class Article {

    id: number
    quantity : number
    prixHT: number
    reduction :number
    redIsPercentage : boolean
    tva: number
    description: string
    typeArticle : TypeArticle
    devis : Devis
    factureSimple : FactureSimple
    factureAvoir : FactureAvoir

    simpleFournisseur :SimpleFournisseur
    avoireFournisseur:AvoireFournisseur


    //+
    bonLivraison :BonLivraison

}
