import { CompteBanc } from "./compte-banc"
import { FactureFournisseur } from "./facture-fournisseur"

export class Paiement{
  id: number
  type: string
  montant: number
  reference: string
  note:string
  dateReglement: Date
  dateRemise: Date
  factureFournisseur :FactureFournisseur
  compteDebiteur :CompteBanc
  compteCrediteur :CompteBanc

}
