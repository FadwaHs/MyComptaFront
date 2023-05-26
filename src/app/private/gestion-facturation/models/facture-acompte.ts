import { FactureAcompteStatus } from './../enums/facture-acompte-status';
import { CompteBanc } from './compte-banc';
import { Devis } from './devis';
import { Facture } from './facture';

export class FactureAcompte extends Facture{
  montantPayed : number
  monIsPercentage : boolean
  status : FactureAcompteStatus
  compteBanc : CompteBanc
  devis : Devis
  date_paiement :Date
}
