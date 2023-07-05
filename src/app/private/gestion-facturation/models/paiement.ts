import { AvoireFournisseur } from "./avoir-fournisseur"
import { CompteBanc } from "./compte-banc"
import { FactureFournisseur } from "./facture-fournisseur"
import { ModeReglement } from "./mode-reglement"
import { SimpleFournisseur } from "./simple-fournisseur"

export class Paiement{
  id: number
  type: string
  montant: number
  reference: string
  note:string
  dateReglement: Date
  dateRemise: Date
  compteDebiteur :CompteBanc
  compteCrediteur :CompteBanc

  //++
  simpleFournisseur :SimpleFournisseur
  avoirFournisseur :AvoireFournisseur
  //++
  modeReglement:ModeReglement
}
