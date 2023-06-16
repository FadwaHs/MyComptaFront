import { AvoireFournisseurStatus } from "../enums/avoire-fournisseur-status";
import { Article } from "./article";
import { FactureFournisseur } from "./facture-fournisseur";
import { Fournisseur } from "./fournisseur";
import { MotCle } from "./mot-cle";
import { Paiement } from "./paiement";

export class AvoireFournisseur extends FactureFournisseur{


  status : AvoireFournisseurStatus
  remise :number
  remIsPercentage :boolean
  articleList : Article[]
  motCleList: MotCle[]
  fournisseur: Fournisseur
  //++
  paiement: Paiement[]

}
