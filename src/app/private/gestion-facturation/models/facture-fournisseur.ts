import { AvoireFournisseur } from "./avoir-fournisseur";
import { Bons } from "./bons";
import { BonsCommande } from "./bons-commande";
import { BonLivraison } from "./bons-livraison";
import { ConditionReglement } from "./condition-reglement";
import { Fournisseur } from "./fournisseur";
import { ModeReglement } from "./mode-reglement";
import { MotCle } from "./mot-cle";
import { Paiement } from "./paiement";
import { SimpleFournisseur } from "./simple-fournisseur";

export class FactureFournisseur{
id: number;
slug: string;
numero_interne: string;
numero_externe: string;
devise: string;
totalHT: number;
totalTTC: number;
note: string
date_creation: Date;
conditionReglement: ConditionReglement|null
modeReglement : ModeReglement|null




}
