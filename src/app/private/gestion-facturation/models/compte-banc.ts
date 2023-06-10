import { Environment } from "../../models/environment"
import { FactureAcompte } from "./facture-acompte"
import { Paiement } from "./paiement"

export class CompteBanc{
  id : number
  iban : string
  bic : string
  titulaire : string
  libelleCompte : string
  cleRib : string
  factureAcompte : FactureAcompte[]
  environment : Environment
  paiementsDebit :Paiement[]
  paiementsCredits :Paiement[]


}
