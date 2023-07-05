import { AvoireFournisseur } from './avoir-fournisseur';
import { SimpleFournisseur } from './simple-fournisseur';
import { Client } from "./client"
import { Devis } from "./devis"
import { Facture } from "./facture"
import { FactureAcompte } from "./facture-acompte"
import { FactureAvoir } from "./facture-avoir"
import { FactureSimple } from "./facture-simple"
import { Opportunite } from "./opportunite"
import { Fournisseur } from "./fournisseur"
import { Societe } from "./societe"

import { BonsCommande } from './bons-commande';

import { Bons } from "./bons"
import { BonLivraison } from "./bons-livraison"


export class MotCle{
    id ?: number
    mot : string
    societe : Societe
    client : Client
    fournisseur: Fournisseur // added this
    devis : Devis
    factureSimple : FactureSimple
    factureAvoir : FactureAvoir
    factureac : FactureAcompte

    opportunite :Opportunite
    simpleFournisseur:SimpleFournisseur
    avoireFournisseur:AvoireFournisseur
    bonsCommande : BonsCommande
    //+
    bonLivraison: BonLivraison

}
